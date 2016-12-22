function GetPluginSettings()
{
	return {
		"name":			"HangitSDK",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"HangitSDK",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Calls cordova hangit plugin - com.hangit.cordova",
		"author":		"Hangit",
		"help url":		"http://www.hangit.com/",
		"category":		"Plugins by Hangit",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":	pf_singleglobal
	};
};

////////////////////////////////////////
// Conditions

// Banners

AddCondition(4, cf_trigger, "On ad preloaded", "Ads", "On ad preloaded", 
	"Triggered when a ad is preloaded.", "onAdpreloaded");

AddCondition(0, cf_trigger, "On ad dismissed", "Ads", "On ad dismissed", 
	"Triggered when a ad is dismissed.", "onAdDismissed");

// Interstitials

AddCondition(1, cf_trigger, "On interstitial ad preloaded", "Interstitials", "On interstitial ad preloaded", 
	"Triggered when a interstitial is received and ready to show.", "onInterstitialAdPreloaded");

AddCondition(2, cf_trigger, "On interstitial ad dismissed", "Interstitials", "On interstitial ad dismissed", 
	"Triggered when a interstitial ad is dismissed.", "onInterstitialAdDismissed");

// Both

AddCondition(3, cf_trigger, "On ad failed", "Both", "On ad failed", 
	"Triggered when an ad fails to load.", "onFailedAd");

////////////////////////////////////////
// Actions

// Banners ///////////////////////////////

// Remove

AddAction(0, af_none, "Remove ad", "Ads", "Remove the ad", 
	"Remove the currently showing ad.", "removeAd");

// Load

AddComboParamOption("TOP CENTER");
AddComboParamOption("BOTTOM CENTER");
AddComboParam("Position", "Choose where the banner ad will appear.");
AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Overlap", "Set to true if want to show the ad overlapping.");
AddAction(1, af_none, "Load a ad", "Ads", "Load a ad", "Start loading a ad. Be sure the ad is loaded before show(just wait a few seconds)", "loadAd");

// Show

AddAction(2, af_none, "Show a ad", "Ads", "Show a ad", "Show a preloaded ad. Be sure the ad is loaded before show(just wait a few seconds)", "showad");

// Interstitials /////////////////////////////////////

// Load and show

AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Overlap", "Set to true if want to show the ad overlapping.");
AddAction(3, af_none, "Load and show an interstitial", "Interstitials", "Load and show an interstitial", "Start loading an interstitial and autoshow when ready.", "loadAndShowInterstitial");

// Only load

AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Overlap", "Set to true if want to show the ad overlapping.");
AddAction(4, af_none, "Load an interstitial", "Interstitials", "Load an interstitial", 
	"Start loading an interstitial. Be sure the interstitial is loaded before show(just wait a few seconds)", "loadInterstitial");

// Show

AddAction(5, af_none, "Show a preloaded interstitial", "Interstitials", "Show a preloaded interstitial", 
	"Show a preloaded interstitial. Be sure the interstitial is loaded before show(just wait a few seconds)", "showInterstitial");

AddAction(6, af_none, "Show a Deals Wallet", "Wallet", "Show the Hangit Wallet", 
	"Show the Hangit Deals Wallet", "showWallet");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Properties

var property_list = [

    new cr.Property(ept_text,   "App Id",  "YOUR APP ID", "Hangit App Id"),
    new cr.Property(ept_text,   "Start", "true", "Start Hangit on App Launch","false|true"),
    new cr.Property(ept_combo,	"Test Mode", "true", "Show test ads.","false|true")


];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}