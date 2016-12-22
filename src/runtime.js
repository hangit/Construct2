// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.HangitSDK = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{	

	var pluginProto = cr.plugins_.HangitSDK.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	var appId = "YOUR APP ID";
	var start = "true";
	var stop  = "false";
	var deals = "true";
	var test;
	var self;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;

	self = this;
	test = false;

	if (this.properties[2]=='true') {test=true;}

	appId=this.properties[0];
	start=this.properties[1];

	if (typeof window['plugins'] == 'undefined') {return;}else{

		window['plugins']['Hangit'].setOptions({publisherId: appId, startLocation: start, isTesting: test});
		
	}

	// set events

	// Banners

	document.addEventListener('onDismissAd', function () {
			self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onAdDismissed, self);
		});

	// Interstitials

	document.addEventListener('onDismissInterstitialAd', function () {
			self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onInterstitialAdDismissed, self);
		});

	// Both

	document.addEventListener('onFailedToReceiveAd', function () {
			self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onFailedAd, self);
		});

	document.addEventListener('onDeals', function () {
			self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onDeals, self);
		});

	};

	function indexToBoolean(index){

		switch (index) {
		case 0:		return true;
		case 1:		return false;
		}

	}

	function triggerEventBanner(){

		self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onBannerAdpreloaded, self);

	}

	function triggerEventInter(){

		self.runtime.trigger(cr.plugins_.HangitSDK.prototype.cnds.onInterstitialAdPreloaded, self);

	}

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// Banners

	Cnds.prototype.onAdDismissed = function ()
	{
		return true;
	};

	Cnds.prototype.onAdpreloaded = function ()
	{
		return true;
	};

	// Interstitials

	Cnds.prototype.onInterstitialAdPreloaded = function ()
	{
		return true;
	};

	Cnds.prototype.onInterstitialAdDismissed = function ()
	{
		return true;
	};

	// Both

	Cnds.prototype.onFailedAd = function ()
	{
		return true;
	};

	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	//Banners
	
	Acts.prototype.removeAd = function ()
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].destroyAdView();}
	}

	Acts.prototype.loadAd = function (pos, overlp)
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].createAdView({adPlacement: indexToBoolean(pos), overlap: indexToBoolean(overlp)});

		document.addEventListener('onReceiveAd', triggerEventAd);

		} // adSize: adSize,
	}

	Acts.prototype.showAd = function ()
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].createAdView();

		document.removeEventListener('onReceiveAd', triggerEventAd);

		} 
	}

	//Inters

	Acts.prototype.loadAndShowInterstitial = function (overlp)
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].prepareInterstitial({appId: start, overlap: indexToBoolean(overlp), autoShow: true});}
	}

	Acts.prototype.loadInterstitial = function (overlp)
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].createInterstitialView({appId: start, overlap: indexToBoolean(overlp), autoShow: false});

		document.addEventListener('onReceiveInterstitialAd', triggerEventInter);

		}
	}

	Acts.prototype.showInterstitial = function ()
	{
		if (typeof window['plugins'] == 'undefined') {return;}else{
		window['plugins']['Hangit'].showInterstitialAd();

		document.removeEventListener('onReceiveInterstitialAd', triggerEventInter);

		}
	}

	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	pluginProto.exps = new Exps();

}());