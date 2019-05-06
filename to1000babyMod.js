if(to1000baby_Mod === undefined) var to1000baby_Mod = {};
if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

to1000baby_Mod.launch = function(){
	
	//init
	to1000baby_Mod.lasttick = 0;
	to1000baby_Mod.tickdelay = 500;
	to1000baby_Mod.buyArray = [
		function() {Game.Objects["Cursor"].buy(100)},
		function() {Game.Objects["Grandma"].buy(100)},
		function() {Game.storeBuyAll()},
		function() {Game.Objects["Prism"].buy(100)},
		function() {Game.Objects["Fractal engine"].buy(100)}
	]
	to1000baby_Mod.buyIterator = 0;
	console.log("to1000baby_Mod loaded");
	if (Game.Has('Inspired checklist')){
	Game.customLogic.push(to1000baby_Mod.Update);
	} else {
		console.log("YOU ARE COOKIE BABY, WAIT TO GET 'Inspired checklist' AND TRY THIS AGAIN");
	}
	to1000baby_Mod.isLoaded = 1;
}

to1000baby_Mod.RealLogic = function(){
	
	if (Game.OnAscend) { //LEGACY SCREEN
	
		if(Game.ReincarnateTimer>0) { //reincarnate
	//console.log("Waiting to reincarnate");
			
		} else { //wait to reincarnate
	//console.log("Reincarnating");
			
Game.Reincarnate(1);
		}
	
	} else { 
		
	
		if(Game.AscendTimer>0) {//wait to ascend
	//console.log("Waiting to ascend");
			
		} else {//grind those cookies
	//console.log("Buying");
		to1000baby_Mod.buyArray[to1000baby_Mod.buyIterator]();
		to1000baby_Mod.buyIterator++;
		to1000baby_Mod.buyIterator %= 5;
		
		//STOLEN FROM OUR TAIL
		
		var chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);
		var ascendNowToOwn=Math.floor(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned));
		var ascendNowToGet=ascendNowToOwn-Math.floor(chipsOwned);
		
		//Should I ascend yet?
		if (ascendNowToGet>0) {
			//YES I Should
			Game.Ascend(1);
		}
		}
	}
}

to1000baby_Mod.Update = function(){
	var noaw = Date.now();
	if(to1000baby_Mod.lasttick === 0) {to1000baby_Mod.lasttick = noaw;}
	else {
		if((noaw-to1000baby_Mod.lasttick) > to1000baby_Mod.tickdelay) {
			to1000baby_Mod.RealLogic();
			to1000baby_Mod.lasttick = noaw;
		}
	}
	//console.log("Hey2");
}

if(!to1000baby_Mod.isLoaded){
	if(CCSE && CCSE.isLoaded){
		to1000baby_Mod.launch();
	}
	else{
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(to1000baby_Mod.launch);
	}
}
