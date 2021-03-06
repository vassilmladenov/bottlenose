# Bottlenose

Bottlenose is a _high quality_ front-end companion app for video game emulators!  
[Download Bottlenose](https://github.com/quinton-ashley/bottlenose/releases)
![](https://raw.githubusercontent.com/quinton-ashley/bottlenose/master/build/icon.png)

## A what?

A front-end or user interface (UI) is the presentation and interaction layer of an app or website.  Most modern emulators have basic game list UIs that you can interact with using a mouse or keyboard but not a game controller.

Bottlenose looks similar to media viewers like Kaleidescape and AppleTV.  You can interact with it using a mouse or game controller.  Unlike other front-ends, Bottlenose has a minimalistic design that prioritizes box art, not metadata.  Check out the screenshots below!

## Features

-   unified UI for mouse/game controller interaction
-   designed for _UHD_ displays and projectors
-   scrapes multiple database sites for the _highest quality_ box art
-   _aesthetic_ UI themes for each supported console
-   launch games in fullscreen
-   reverse scroll effect on alternating rows in cover view mode
-   uses individual emulators: no cores and no controller input lag
-   controllers connect automatically, no setup
-   auto maps Xbox One and PS4 controllers to Switch button layout
-   browse demo mode if don't have any games on your computer
-   the only high quality front end to support Linux, macOS, and Windows!

## Supported Emulators

#### Dolphin (Wii, Gamecube, Virtual Console) [Linux, macOS, & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/gcn.PNG)

#### Cemu (Wii U) [Windows & Linux* using Wine]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/wiiu.PNG)

#### Yuzu (Switch) [Linux & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/switch.PNG)

#### Citra (3DS) [Linux, macOS, & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/n3ds.PNG)

#### DeSmuME (DS) [Linux, macOS & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/ds.PNG)

#### Xenia (Xbox 360) [Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/xbox360.PNG)

#### RPCS3 (PS3) [Linux & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/ps3.PNG)

#### PCSX2 (PS2) [Linux, macOS, & Windows]

![](https://raw.githubusercontent.com/quinton-ashley/bottlenose-screenshots/master/ps2.PNG)

## Please consider donating!

Even though Bottlenose is open source software that's free to use, it still took a lot of work and a long time to develop.  If you appreciate my work so far and will continue to use this app please donate an amount of your choosing.  I'm a freelance developer so I need your support to develop new features.  Thank you!

Monthly Donations:  
Patreon: <https://www.patreon.com/qashto>  

Single Donation:  
Paypal: <https://www.paypal.me/qashto/25>  
Ethereum: 0xb4355179da353f1BA4AA0BB5a7E3Ba4FdC7128ea  

## Planned Features!

I want to make Bottlenose a full companion app for Dolphin and other emulators, not just a nice front-end.  If enough people are interested in Bottlenose and donate enough, I will be able to set aside the time to implement these features!

-   batch install/update texture packs for Dolphin
-   batch install/update graphics packs for Cemu
-   automatic emulator updates for emus that lack this feature
-   easy way to mix and swap texture packs for Dolphin
-   list style view mode for browsing through box sides, useful for very large game libraries
-   instant search
-   custom themes
-   mGBA support

## How is Bottlenose different from other front-ends?

Emulation Station is a nice front end for Windows and Linux.  Like Bottlenose, it's open source!  I was inspired by Emulation Station when I started working on Bottlenose.  However, with Bottlenose I wanted to make box art the primary, practically singular, focus of the UI, not metadata or descriptions.
![](https://emulationstation.org/assets/featurettes/full/theming_list.png)

The most popular front end for Windows is Launchbox.  If Launchbox's design is a bit too hectic for you then you might like the simplicity of Bottlenose!  Launchbox looks useful for old arcade titles and seems like it's ready to run in custom arcade cabinets and on PCs with older hardware.  It shoots for quantity over quality image wise which makes sense for giant arcade game libraries.  Also, a lot of the game cover screens erroneously contain in-game or promotional art for a different game.  For example in the promotional video, Super Smash Bros. for N64 has Brawl character renders behind it.  Maybe that's not a big deal for most people but I don't like that.  Overall, I like Launchbox and Bottlenose is not intended to replace it.  Launchbox has support for so many emulators and numerous impressive features.  Instead, Bottlenose will mainly focus on mature emulators of consoles released after the year 2000.  Screenshot is of the "Big Box" mode of Launchbox.
![](https://www.launchbox-app.com/Resources/Images/Screenshots/Big-Box-Nintendo-GameCube.jpg)

OpenEmu for macOS is a great app for making controller profiles consistent among different emulators.  Otherwise it looks just like dark mode Finder.  I use it on my Macbook on plane flights and I like it.  The covers are low-res, grid spacing is too wide.
![](http://openemu.org/img/intro-gb-grid.png)

Windows Explorer, despite not having gamepad support, is also surprisingly popular for some reason.  I've seen reddit posts with tutorials on how to make individual executables that launch emulators with a particular game.  This is a poor substitute for a dedicated game launcher app.  Explorer also has a blinding white background which is not easy on the eyes during late night gaming sessions.
![](https://i.redd.it/z7zxgap037p11.png)

Retroarch is not really comparable to Bottlenose.  It uses seperate cores instead of individual emulator apps.  Game art is low res and the interface is barebones.  Good for small devices but I would never use it.
![](https://d2.alternativeto.net/dist/s/retroarch_203397_full.png?format=jpg&width=1600&height=1600&mode=min&upscale=false)

Steam is an ugly mess on UHD displays and if you're reading this you've probably used it already.  I'm not going to include a screen shot here.  You're welcome.

## Using Bottlenose

Unlike Steam, Bottlenose does not send controller input to emulators.  Therefore there is no lag caused by using Bottlenose.  Bottlenose auto detects controllers, no setup required.  Button input is mapped from Xbox One and PS4 button layouts to the Switch button layout.  Although this may be confusing to some I decided to do this because I like playing games made for Nintendo consoles with the button layout intended by the developers.

The console themed cover overlay shows your basic options.  On any game lib view you can press the "Start" button on your controller or click "Bottlenose" on the console cover overlay to access the settings menu.  If you've added new games to your game libraries "Reset" will reload you game library.  "Open" will pull up a menu with a list of game consoles.  Select a console to open your game libraries for that console.  "Power" starts the console emulator without a game.

Select a game from your game library to view it's cover.  You'll see the cover overlay change.  Clicking "Play" will play the game.

## System Requirements

Bottlenose will probably not perform well on low-end systems.  Utlra high resolution images require more storage and animations using these images require strong GPUs.  Although, I've tested Bottlenose on my 2016 Macbook with a 1.1GHz CPU with onboard Intel HD 515 graphics and it runs at 2304x1440 just fine.

## Error Reporting

If Bottlenose has trouble matching your game file names and you see a bunch of covers of mismatched games or you are missing games in your library view, please [send me](mailto:qashto@gmail.com) your error log file and I'll try to sort it out.  Send me a description of any other errors or report an issue with the code on this project's Github.

## Optional Template File Structure

```javascript
emu (root folder can have any name)
├─┬ Dolphin
│ ├─┬ BIN
│ │ ├── User/...
│ │ ├── portable.txt
│ │ ├── Dolphin.exe
│ │ └── ...
│ └─┬ GAMES
│   ├── Super Mario Sunshine.gcz
│   ├── Super Smash Bros Melee.iso
│   └── sm64.wad
└─┬ Cemu
  ├─┬ BIN
	│ ├── Cemu.exe
  │ └── ...
  └─┬ GAMES
    └─┬ Mario Kart 8 (game folder)
      └─┬ code
        └── Turbo.rpx
```

Bottlenose was designed to optionally use the same directory structure as WiiUSBHelper, for compatibility.  Although WiiUSBHelper is no longer maintained, Bottlenose will continue to use this structure as the template.  The default game library of each emulator will be its `GAMES` folder.  As an exception, Bottlenose will default to the internal game library of emulators that store games in file structures meant to mimic the system being emulated.  For example, RPCS3 has an internal game library that will be located at `emu/RPCS3/BIN/dev_hdd0/game`.

On windows, the auto-updater for yuzu doesn't let users pick yuzu's location.  This is okay, Bottlenose will default to the location that the installer uses instead of `emu/Yuzu/BIN`.

## Emulators Supported on Linux

The Linux version of Bottlenose now supports Cemu (wine), Citra (flatpak), Dolphin, and PCSX2.  I will add support for DeSmuME, RPCS3 and Yuzu soon.

## Development Info

Bottlenose is open source and MIT licensed!  I loved using Electron to make Bottlenose.  I highly recommend it to devs interested in creating native desktop apps with node.js.  Bottlenose is written in good ol', no-types-allowed javascript and proudly uses Pug, jQuery, Bootstrap, and Contro.

## Contributing to Bottlenose (code)

PRs are welcome!  Please follow my coding style though.  No callback pyramids, use Async/Await whenever possible.  Do not write plain JS novels when editing the DOM, just use jQuery please.  I will be changing more of the code to make contro-ui a separate package shortly.

## Contributing to Bottlenose

If you would like to update an existing game database, make a PR or email me <mailto:qashto@gmail.com> with your new or updated entries.  Game database JSON files can be found in the db folder.  Game entries are structured like this:

```javascript
{
 "id": "G8ME01",
 "title": "Paper Mario: The Thousand-Year Door",
 "texp": [{
	 "name": "HD",
	 "authors": ["The Dolphin Community"],
	 "rate": 10,
	 "version": "1.7.0",
	 "png": "https://drive.google.com/file/d/1QtgZFz2darznGNtViJVOep8UZ3xuaUkN/view?usp=sharing",
	 "dds": "https://drive.google.com/file/d/1x6XJnQTW9SvbA6EmNHIKz9bGDXXweHAD/view?usp=sharing",
	 "url": "https://forums.dolphin-emu.org/Thread-paper-mario-ttyd-hd-texture-pack-v1-7-july-4-2018"
 }]
}
```

### Game Properties

-   `id` is the official id of the game, if the game you're adding is a homebrew or mod then you must make a unique id for it with a valid region code
-   `name` the official name of the game, subtitles should be delineated using a colon.
-   `texp` the texture pack array, order is irrelevant
-   `img` img array which contains an object with image names/image url key/data pairs that override the default scape location.

### Texture Packs

-   `name` should be short, simple and should not include "Texture" or "Pack".
-   `png` and `dds` links must be direct download links or google drive links.  No Mega links, they will never be supported by Bottlenose.
-   `url` is the link to the relevant forum post or readme.
-   `version` must use semantic versioning.
-   `rate` is the pack's rating 1-10.

### Images

The following names can be used to specify images:

-   `"box"` the front cover including box ()
-   `"coverFull"` the entire cover sleeve, no box
-   `"cover"` the front facing portion of the cover sleeve, no box
-   `"disc"` the front of the game's (first) disc
-   `"cart"` the front of the game's (first) cartridge

Box art is prioritized in this order: box (highest quality), coverFull, cover, box (low quality).  In a future version of bottlenose users will be able to change images in the UI.  For now, add them in an `img` object like this:

```javascript
{
 "id": "ALERA",
 "title": "Mario Tennis Aces",
 "texp": [],
 "img": {
	 "box": "https://images-na.ssl-images-amazon.com/images/I/91TvX36nF-L.jpg"
 }
}
```

## User Preferences

`region` game files without game IDs in their game file name, for example "Super Smash Bros Melee.iso", will be auto assigned to a default region.  Use E for North and South America, P for European PAL, J for Japan.

`ui.mouse.wheel.smoothScroll` = false on Windows by default, should be true if you have a mouse that supports smooth scrolling (like an Apple Macbook trackpad)

`ui.mouse.wheel.multi` it's a multiplier that changes the scroll amount.

`ui.getBackCoverHQ` get's the back of the box in high quality for games without available full covers

`ui.recheckImgs` when true, on reset, images for all games in the given library, not just new games will be scraped for

`session.sys` the last game library viewed, Bottlenose will load this library on start-up next time the app is run

## Planned Features! (continued)

Texture packs with a rating of 7 and above will be considered recommended.  In a future version of Bottlenose, users will be able to batch install all the recommended packs for their entire game library.  The highest ranking pack for each game will become the default pack and placed in `User/Load/Textures`.  Users will still be able to install non-recommended packs individually in the app.  Incompleteness of a pack has no bearing on a pack's rating.  Pack ratings will be curated by me (quinton-ashley/qashto) and based on the Dolphin forum's democratic star rating and opinions from other texture pack creators.  The vast majority of packs currently on the Dolphin forums will receive a 8-10.

## Credits!

Bottlenose uses publicly available images under Fair Use.  

### Logo

The logo is a vaporwave style variation on MayImilae's Dolphin logo
<https://commons.wikimedia.org/wiki/File:Dolphin-logo.svg>

### Databases

gametdb database text files  
<https://www.gametdb.com/>

### Covers

The highest quality box scans are from Andy Decarli!  
<http://andydecarli.com/Video%20Games/Collection>

Full covers, boxes, discs/carts are scraped from gametdb  
<https://www.gametdb.com/>

Some full resolution product images from Amazon are used for Wii U and Switch titles.

### Template Art

-   Gamecube, Wii, and Wii U templates by etschannel via deviantart
-   Switch template by ponces245 via deviantart
-   PS3 template by the_prototype92 via deviantart
-   3DS template by omegaaaronyt via deviantart
-   Xbox 360 template by georgiajedward via deviantart

### Themes

As of yet, all themes were made by me (quinton-ashley/qashto)

### Loading Sequences

Gamecube Intro by MarcMalignan : MIT licensed  
<https://codepen.io/MarcMalignan/pen/doCth>

DS by Murat Khatypov  
<https://codepen.io/AntonEssenetial/pen/LtBaK>

Switch Pure CSS by joshbader : MIT licensed  
<https://codepen.io/joshbader/pen/mjZzGM>

Wii U Gamepad SVG by Tokyoship from Wikimedia Commons  
Creative Commons Attribution 3.0 Unported  
<https://en.wikipedia.org/wiki/File:Wii_U_controller_illustration.svg>

3DS SVG image trace by me (quinton-ashley/qashto)  

Xbox 360 Loading Intro by Girish Sharma
<https://codepen.io/grssam/pen/dLbcv>

PS3 Icon Loader by Jan Machycek  
<https://codepen.io/machyj/pen/ENvewe>

### Fonts

nintender  
<http://www.fontspace.com/lyric-type/nintender>  
Gamecuben  
<https://www.dafont.com/gamecube.font>  
Continum  
<https://fontmeme.com/fonts/continuum-font/>  
theboldfont  
<https://www.dafont.com/the-bold-font.font>  
DS_BIOS  
<https://www.dafont.com/nintendo-ds-bios.font>  

## Legal Disclaimer

Although [Emulation is legal](https://en.wikipedia.org/wiki/Bleem!), pirating games you do not own is illegal.  Bottlenose does not condone piracy.  Bottlenose is open source software that does not infringe on any copyrights of texture packers, developers, or publishers.  Bottlenose is not affiliated with Nintendo, Sony, or Microsoft.  Anyone asking for or sharing information related to digital piracy on this project's Github issues will have their comments removed and flagged.
