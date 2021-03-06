const Viewer = function() {
	let opt = {};
	opt.v = false;
	const log = console.log;

	const {
		remote
	} = require('electron');
	const {
		app
	} = remote;
	const elec = require('./electronWrap.js');
	const spawn = require('await-spawn');
	const delay = require('delay');
	const fs = require('fs-extra');
	const klawAsync = require('klaw');
	const klaw = function(dir, options) {
		return new Promise((resolve, reject) => {
			let items = [];
			let i = 0;
			require('klaw')(dir, options)
				.on('data', item => {
					if (i > 0) {
						items.push(item.path);
					}
					i++;
				})
				.on('end', () => resolve(items))
				.on('error', (err, item) => reject(err, item));
		});
	};
	const os = require('os');
	const path = require('path');
	const req = require('requisition');
	let osType = os.type();
	const linux = (osType == 'Linux');
	const mac = (osType == 'Darwin');
	const win = (osType == 'Windows_NT');
	if (win) {
		osType = 'win';
	} else if (mac) {
		osType = 'mac';
	} else if (linux) {
		osType = 'linux';
	}

	let games;
	let prefs;
	let sys;
	let emu;
	let themes;
	let theme;
	let defaultCoverImg;
	let templateAmt = 4;

	async function dl(url, file) {
		if (!(await fs.exists(file))) {
			let res = await req(url);
			if (res.status == 404) {
				return;
			}
			$('#loadDialog1').text(url.replace(/\%20/g, ' '));
			log('loading image: ' + url);
			log('saving to: ' + file);
			await res.saveTo(file);
			$('#loadDialog1').text(' ');
		}
		return file;
	}

	async function dlNoExt(url, file) {
		let res;
		for (let i = 0; i < 2; i++) {
			if (i == 0) {
				res = await dl(url + '.jpg', file + '.jpg');
			} else if (i == 1) {
				res = await dl(url + '.png', file + '.png');
			}
			if (res) {
				return res;
			}
		}
		return;
	}

	async function dlFromAndy(title, file, system) {
		let url = `http://andydecarli.com/Video Games/Collection/${system}/Scans/Full Size/${system} ${title}`;
		url = url.replace(/ /g, '%20');
		log(url);
		let res = await dl(url + `%20Front%20Cover.jpg`, file);
		if (res && prefs.ui.getBackCoverHQ) {
			await dl(url + `%20Back%20Cover.jpg`, file);
		}
		return res;
	}

	async function getImg(game, name, skip) {
		let dir = `${prefs.btlDir}/${sys}/${game.id}/img`;
		let file, res, url;
		// check if game img is specified in the gamesDB
		if (game.img && game.img[name]) {
			url = game.img[name].split(/ \\ /);
			if (url[1]) {
				ext = url[1];
				url = url[0];
			} else {
				url = url[0];
				ext = url.substr(-3);
			}
			file = `${dir}/${name}.${ext}`;
			res = await dl(url, file);
			if (res) {
				return res;
			}
		}
		$('#loadDialog0').html(md(`scraping for the  \n${name}  \nof  \n${game.title}`));
		// get high quality box for gamecube/wii
		if (sys != 'switch' && name == 'box') {
			file = `${dir}/${name}.jpg`;
			if (await fs.exists(file)) {
				return file;
			}
			let title = game.title.replace(/[\:]/g, '');
			if (sys == 'wiiu') {
				res = await dlFromAndy(title, file, 'Nintendo Wii U');
			} else if (sys == '3ds') {
				res = await dlFromAndy(title, file, 'Nintendo 3DS');
			} else if (sys == 'ds') {
				res = await dlFromAndy(title, file, 'Nintendo DS');
			} else if (sys == 'ps3') {
				res = await dlFromAndy(title, file, 'Sony PlayStation 3');
			} else if (sys == 'ps2') {
				res = await dlFromAndy(title, file, 'Sony PlayStation 2');
			} else if (sys == 'xbox360') {
				res = await dlFromAndy(title, file, 'Xbox 360');
			} else if (sys == 'gba') {
				res = await dlFromAndy(title, file, 'Game Boy Advance');
			} else if (game.id.length > 4) {
				res = await dlFromAndy(title, file, 'Nintendo Game Cube');
				if (!res) {
					res = await dlFromAndy(title, file, 'Nintendo Wii');
				}
			} else {
				res = await dlFromAndy(title, file, 'Nintendo 64');
				if (!res) {
					res = await dlFromAndy(title, file, 'Super Nintendo');
				}
				if (!res) {
					res = await dlFromAndy(title, file, 'Nintendo');
				}
			}
			if (res) {
				return res;
			}
		}
		if (skip) {
			return;
		}
		// get image from gametdb
		file = `${dir}/${name}`;
		let id = game.id;
		for (let i = 0; i < 3; i++) {
			if (sys != 'switch' && i == 1) {
				break;
			}
			if (i == 1) {
				id = id.substr(0, id.length - 1) + 'B';
			}
			if (i == 2) {
				id = id.substr(0, id.length - 1) + 'C';
			}
			let locale = 'US';
			if (sys == 'ps3') {
				if (id[2] == 'E') {
					locale = 'EN';
				}
			}
			url = `https://art.gametdb.com/${sys}/${((name!='coverFull')?name:'coverfull')}HQ/${locale}/${id}`;
			log(url);
			res = await dlNoExt(url, file);
			if (res) {
				return res;
			}
			url = url.replace(name + 'HQ', name + 'M');
			res = await dlNoExt(url, file);
			if (res) {
				return res;
			}
			url = url.replace(name + 'M', name);
			res = await dlNoExt(url, file);
			if (res) {
				return res;
			}
		}
		return;
	}

	function getTemplate() {
		if (!theme.template.box) {
			theme.template.box = '';
		}
		return {
			id: '_TEMPLATE',
			title: 'Template',
			img: theme.template
		};
	}

	async function loadImages() {
		let imgDir;
		for (let i = 0; i < games.length + 1; i++) {
			let res;
			let game = games[i];
			if (i == games.length) {
				game = getTemplate();
			}
			imgDir = `${prefs.btlDir}/${sys}/${game.id}/img`;
			if (prefs.ui.recheckImgs || !(await fs.exists(imgDir))) {
				await getImg(game, 'box', true);
				res = await getImg(game, 'coverFull');
				if (!res && !(await imgExists(game, 'box'))) {
					res = await getImg(game, 'cover');
					if (!res) {
						await getImg(game, 'box');
					}
				}
				if (sys != 'switch' && sys != '3ds') {
					await getImg(game, 'disc');
				} else {
					await getImg(game, 'cart');
				}
			}
			await fs.ensureDir(imgDir);
		}
		defaultCoverImg = await getImg(theme.default, 'box');
		if (!defaultCoverImg) {
			log('ERROR: No default cover image found');
			return;
		}

		games = games.sort((a, b) => a.title.localeCompare(b.title));
	}

	async function imgExists(game, name) {
		let file = `${prefs.btlDir}/${sys}/${game.id}/img/${name}.png`;
		if (!(await fs.exists(file))) {
			file = file.substr(0, file.length - 3) + 'jpg';
			if (!(await fs.exists(file))) {
				return;
			}
			return file;
		}
		return file;
	}

	async function addCover(game, reelNum) {
		let cl1 = '';
		let file = await imgExists(game, 'box');
		if (!file) {
			file = await imgExists(game, 'coverFull');
			cl1 = 'front-cover-crop ' + sys;
			if (!file) {
				file = await imgExists(game, 'cover');
				cl1 = 'front-cover ' + sys;
				if (!file) {
					log(`no images found for game: ${game.id} ${game.title}`);
					return;
				}
			}
		}
		$('.reel.r' + reelNum).append(pug(`
#${game.id}.uie${((game.id != '_TEMPLATE')?'':'.uie-disabled')}
	${((cl1)?`img.box(src="${defaultCoverImg}")`:'')}
	section${((cl1)?'.'+cl1: '')}
		img${((cl1)?'.cov': '.box')}(src="${file}")
		${((cl1)?'.shade.p-0.m-0':'')}
		`));
	}

	async function animatePlay() {
		await delay(10000);
		remote.getCurrentWindow().minimize();
	}

	function getAbsolutePath(file) {
		if (!file) {
			return '';
		}
		let lib = file.match(/\$\d+/g);
		if (lib) {
			lib = lib[0].substr(1);
			log(lib);
			file = file.replace(/\$\d+/g, prefs[sys].libs[lib]);
		}
		let tags = file.match(/\$[a-zA-Z]+/g);
		if (!tags) {
			return file;
		}
		let replacement = '';
		for (tag of tags) {
			tag = tag.substr(1);
			if (tag == 'home') {
				replacement = os.homedir().replace(/\\/g, '/');;
			}
			file = file.replace('$' + tag, replacement);
		}
		return file;
	}

	async function getEmuAppPath() {
		let emuAppPath = getAbsolutePath(prefs[sys].app[osType]);
		if (emuAppPath && await fs.exists(emuAppPath)) {
			return emuAppPath;
		}
		emuAppPath = '';
		let emuDirPath = '';
		if (win || (linux && emu == 'cemu')) {
			emuDirPath = path.join(prefs.btlDir,
				`../${prefs[sys].emu}/BIN`);
			if (emu == 'citra') {
				if (await fs.exists(emuDirPath + '/nightly-mingw')) {
					emuDirPath += '/nightly-mingw';
				} else {
					emuDirPath += '/canary-mingw';
				}
			}
			if (emu == 'switch') {
				emuDirPath = os.homedir() + '/AppData/Local/yuzu';
				if (await fs.exists(emuDirPath + '/canary')) {
					emuDirPath += '/canary';
				} else {
					emuDirPath += '/nightly';
				}
			}
		} else if (mac) {
			emuDirPath = '/Applications';
		}
		let emuNameCases = [
			prefs[sys].emu,
			prefs[sys].emu.toLowerCase(),
			prefs[sys].emu.toUpperCase()
		];
		for (let i = 0; i < emuNameCases.length; i++) {
			if (emuDirPath) {
				emuAppPath = emuDirPath + '/';
			}
			emuAppPath += emuNameCases[i];
			if (win || (linux && emu == 'cemu')) {
				if (emu == 'citra') {
					emuAppPath += '-qt';
				}
				emuAppPath += '.exe';
			} else if (mac) {
				if (emu == 'citra') {
					emuAppPath += `/nightly/${emuNameCases[1]}-qt`;
				} else if (emu == 'yuzu') {
					emuAppPath += '/' + emuNameCases[1];
				}
				emuAppPath += '.app/Contents/MacOS';
				if (emu == 'desmume') {
					emuAppPath += '/' + emuNameCases[0];
				} else {
					emuAppPath += '/' + emuNameCases[1];
				}
				if (emu == 'citra') {
					emuAppPath += '-qt-bin';
				} else if (emu == 'yuzu') {
					emuAppPath += '-bin';
				}
			} else if (linux) {
				if (emu == 'dolphin') {
					emuAppPath = 'dolphin-emu';
				}
			}
			if ((linux && emu != 'cemu') || await fs.exists(emuAppPath)) {
				prefs[sys].app[osType] = emuAppPath;
				return emuAppPath;
			}
		}
		emuAppPath = elec.selectFile('select emulator app');
		if (mac) {
			emuAppPath += '/Contents/MacOS/' + emuNameCases[1];
			if (emu == 'citra') {
				emuAppPath += '-qt-bin';
			} else if (emu == 'switch') {
				emuAppPath += '-bin';
			}
		}
		if (!(await fs.exists(emuAppPath))) {
			cui.err('app path not valid: ' + emuAppPath);
			return '';
		}
		prefs[sys].app[osType] = emuAppPath;
		return emuAppPath;
	}

	this.powerBtn = async function() {
		let id = cui.getCur('libMain').attr('id');
		if (!id) {
			cui.err('cursor was not on a game');
			return;
		}
		let emuAppPath = await getEmuAppPath();
		if (!emuAppPath) {
			return;
		}
		let gameFile;
		let args = [];
		emuDirPath = path.join(emuAppPath, '..');
		if (linux) {
			if (emu == 'cemu') {
				args.push(emuAppPath);
				emuAppPath = 'wine';
			} else if (emu == 'citra') {
				emuAppPath = 'flatpak';
				args.push('run');
				args.push('org.citra.citra-canary');
			}
		}
		if (cui.ui == 'cover') {
			gameFile = games.find(x => x.id === id);
			if (gameFile) {
				gameFile = getAbsolutePath(gameFile.file);
			} else {
				cui.err('game not found: ' + id);
				return;
			}
			if (emu == 'rpcs3') {
				gameFile += '/USRDIR/EBOOT.BIN';
			}
			if (emu == 'cemu') {
				let files = await klaw(gameFile + '/code');
				log(files);
				let ext, file;
				for (let i = 0; i < files.length; i++) {
					file = files[i];
					ext = path.parse(file).ext;
					if (ext == '.rpx') {
						gameFile = file;
						break;
					}
				}
				args.push('-g');
			}
		}
		log(emu);
		if (cui.ui == 'cover') {
			args.push(gameFile);
			if (emu == 'cemu' || emu == 'citra') {
				args.push('-f');
			} else if (emu == 'dolphin') {
				args.push('-b');
			} else if (emu == 'xenia') {
				args.push('--d3d12_resolution_scale=2');
				args.push('--fullscreen');
			} else if (emu == 'pcsx2') {
				args.push('--nogui');
				args.push('--fullscreen');
			}
			cui.removeView('libMain');
			cui.uiStateChange('playingBack');
		}
		log(emuAppPath);
		log(args);
		log(emuDirPath);
		try {
			// animatePlay();
			await spawn(emuAppPath, args, {
				cwd: emuDirPath,
				stdio: 'inherit'
			});
		} catch (ror) {
			cui.err(`${prefs[sys].emu} was unable to start the game or crashed.  This is probably not an issue with Bottlenose.  If you were unable to start the game, setup ${emu} if you haven't already.  Make sure it will boot the game and try again.  \n${ror}`);
		}
		remote.getCurrentWindow().focus();
		remote.getCurrentWindow().setFullScreen(true);
	}

	function flipCover() {
		log('flip cover not enabled yet');
	}

	async function addTemplates(template, rows, num) {
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < num; j++) {
				await addCover(template, i);
			}
		}
	}

	this.doAction = async function(act) {
		let ui = cui.ui;
		log(ui);
		let onMenu = (/menu/gi).test(ui);
		if (ui == 'libMain') {
			if (act == 'a') {
				if (cui.coverClicked()) {
					cui.uiStateChange('cover');
				}
			} else if (act == 'b' && !onMenu) {
				cui.uiStateChange('sysMenu');
			} else {
				return false;
			}
		} else if (ui == 'cover') {
			if (act == 'b') {
				cui.coverClicked();
				cui.uiStateChange('libMain');
			} else if (act == 'y') {
				flipCover();
			} else {
				return false;
			}
		} else {
			return false;
		}
		return true;
	}

	this.load = async function(usrGames, usrPrefs, usrSys) {
		cui.resize(true);
		let reload;
		if (games) {
			reload = true;
		}
		games = usrGames;
		prefs = usrPrefs;
		sys = usrSys;
		emu = prefs[sys].emu.toLowerCase();
		if (!themes) {
			let themesPath = path.join(global.__rootDir, '/prefs/themes.json');
			themes = JSON.parse(await fs.readFile(themesPath));
		}
		theme = themes[prefs[sys].style || sys];
		theme.style = prefs[sys].style || sys;
		cui.setMouse(prefs.ui.mouse, 100 * prefs.ui.mouse.wheel.multi);
		await loadImages();
		let rows = 8;
		if (games.length < 18) {
			rows = 4;
		}
		if (games.length < 8) {
			rows = 2;
		}
		$('style.gameViewerRowsStyle').remove();
		let $glv = $('#libMain');
		let dynRowStyle = `<style class="gameViewerRowsStyle" type="text/css">.reel {width: ${1 / rows * 100}%;}`
		for (let i = 0; i < rows; i++) {
			$glv.append(pug(`.reel.r${i}.row-y.${((i % 2 == 0)?'reverse':'normal')}`));
			dynRowStyle += `.reel.r${i} {left:  ${i / rows * 100}%;}`
		}
		dynRowStyle += `.cui-gamepadConnected .reel .uie.cursor {
	outline: ${Math.abs(7-rows)}px dashed white;
	outline-offset: ${ 9-rows}px;
}`;
		dynRowStyle += '</style>';
		$('body').append(dynRowStyle);
		let template = getTemplate();
		await addTemplates(template, rows, templateAmt);
		for (let i = 0, j = 0; i < games.length; i++) {
			try {
				for (let k = 0; k < rows; k++) {
					if (i < games.length * (k + 1) / rows) {
						await addCover(games[i], k);
						break;
					}
				}
				j++;
			} catch (ror) {
				log(ror);
			}
		}
		await addTemplates(template, rows, templateAmt);
		cui.addView('libMain');
		$('#dialogs').hide();
		$('#view').css('margin-top', '20px');
		if (!reload) {
			cui.rebind('mouse');
		}
	}
};
module.exports = new Viewer();
