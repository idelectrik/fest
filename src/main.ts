/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let vip1DoorClosed = true;
let vip2DoorClosed = true;
let backstageDoorClosed = true;

// Waiting for the API to be readydoesn
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // ENTRY
    if (WA.player.state.registered) {
        WA.controls.restorePlayerProximityMeeting()
        WA.room.hideLayer("entryClosed")
    } else {
        WA.controls.disablePlayerProximityMeeting()
        currentPopup = WA.ui.openPopup("WelcomePopup", "Welcome to FestAdventure,\n You have to register to enter the Virtual Festival World", [
            {
                label: 'Instruction',
                className: 'primary',
                callback: () => WA.nav.openCoWebSite("https://www.youtube.com/embed/eNKRI4TwjQ8?autoplay=1", false, "fullscreen;autoplay"),
            }
        ])
    }
    WA.player.state.onVariableChange('registered').subscribe((registered) => {
        if (registered) {
            WA.room.hideLayer("entryClosed")
            WA.controls.restorePlayerControls()
            WA.controls.restorePlayerProximityMeeting()
            WA.nav.closeCoWebSite()
        } else {
          WA.room.showLayer("entryClosed")
        }
    });
    
    WA.room.area.onLeave("Welcome").subscribe(() => {closePopup(); WA.nav.closeCoWebSite()})

    // STAGES
    WA.room.area.onEnter("MainStage").subscribe(() => {
        // @ts-ignore
        WA.controls.turnOffMicrophone()
    })
    WA.room.area.onEnter("SecondStage").subscribe(() => {
        // @ts-ignore
        WA.controls.turnOffMicrophone()
    })

    // DOORS
    WA.room.area.onEnter("vip1Door").subscribe(() => {
        if (WA.player.tags.includes("festadventure") && vip1DoorClosed) {
            WA.ui.displayActionMessage({
                message: "Press SPACE or Touch to open the door (only for you)",
                callback: () => {
                    vip1DoorClosed = false;
                    WA.room.hideLayer("vip1Closed")
                    WA.room.showLayer("vip1Open")
                }
            })
        }
    })
    WA.room.area.onEnter("vip2Door").subscribe(() => {
        if (WA.player.tags.includes("festadventure") && vip2DoorClosed) {
            WA.ui.displayActionMessage({
                message: "Press SPACE or Touch to open the door (only for you)",
                callback: () => {
                    vip2DoorClosed = false;
                    WA.room.hideLayer("vip2Closed")
                    WA.room.showLayer("vip2Open")
                }
            })
        }
    })
    WA.room.area.onEnter("backstageDoor").subscribe(() => {
        if (WA.player.tags.includes("festadventure") && backstageDoorClosed) {
            WA.ui.displayActionMessage({
                message: "Press SPACE or Touch to open the door (only for you)",
                callback: () => {
                    backstageDoorClosed = false;
                    WA.room.hideLayer("backstageClosed")
                    WA.room.showLayer("backstageOpen")
                }
            })
        }
    })

    // MERCH POPUPS
    WA.room.area.onEnter("Merch1").subscribe(() => {
        currentPopup = WA.ui.openPopup("Merch1Popup", "Take a look at our awesome merch!", [
            {
                label: 'Shop now',
                className: 'primary',
                callback: () => WA.nav.openCoWebSite("https://www.deathwishcoffee.com/"),
            }
        ])
    })
    WA.room.area.onLeave("Merch1").subscribe(() => {closePopup(); WA.nav.closeCoWebSite()})

    WA.room.area.onEnter("Merch2").subscribe(() => {
        currentPopup = WA.ui.openPopup("Merch2Popup", "Take a look at our awesome merch!", [
            {
                label: 'Shop now',
                className: 'primary',
                callback: () => WA.nav.openCoWebSite("https://www.deathwishcoffee.com/"),
            }
        ])
    })
    WA.room.area.onLeave("Merch2").subscribe(() => {closePopup(); WA.nav.closeCoWebSite()})

    WA.room.area.onEnter("Merch3").subscribe(() => {
        currentPopup = WA.ui.openPopup("Merch3Popup", "Take a look at our awesome merch!", [
            {
                label: 'Shop now',
                className: 'primary',
                callback: () => WA.nav.openCoWebSite("https://www.deathwishcoffee.com/"),
            }
        ])
    })
    WA.room.area.onLeave("Merch3").subscribe(() => {closePopup(); WA.nav.closeCoWebSite()})

    // SOCIAL NETWORKS POPUPS
    WA.room.area.onEnter("Discord").subscribe(() => {
        currentPopup = WA.ui.openPopup("DiscordPopup", "Become a member", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://shop.q-dance.com/network"),
            }
        ])
    })
    WA.room.area.onLeave("Discord").subscribe(closePopup)

    WA.room.area.onEnter("Instagram").subscribe(() => {
        currentPopup = WA.ui.openPopup("InstagramPopup", "Follow us on Instagram", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://www.instagram.com/q_dance/"),
            }
        ])
    })
    WA.room.area.onLeave("Instagram").subscribe(closePopup)

    WA.room.area.onEnter("Facebook").subscribe(() => {
        currentPopup = WA.ui.openPopup("FacebookPopup", "Follow us on Facebook", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://www.facebook.com/Qdance/"),
            }
        ])
    })
    WA.room.area.onLeave("Facebook").subscribe(closePopup)

    WA.room.area.onEnter("TikTok").subscribe(() => {
        currentPopup = WA.ui.openPopup("TikTokPopup", "Follow us on TikTok", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://www.tiktok.com/@q_dance_official"),
            }
        ])
    })
    WA.room.area.onLeave("TikTok").subscribe(closePopup)

    WA.room.area.onEnter("Twitter").subscribe(() => {
        currentPopup = WA.ui.openPopup("TwitterPopup", "Follow us on Twitter", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://twitter.com/q_dance"),
            }
        ])
    })
    WA.room.area.onLeave("Twitter").subscribe(closePopup)

    WA.room.area.onEnter("Snapchat").subscribe(() => {
        currentPopup = WA.ui.openPopup("SnapchatPopup", "Become a member", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://shop.q-dance.com/network"),
            }
        ])
    })
    WA.room.area.onLeave("Snapchat").subscribe(closePopup)

    WA.room.area.onEnter("Youtube").subscribe(() => {
        currentPopup = WA.ui.openPopup("YoutubePopup", "Subscribe on Youtube", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://www.youtube.com/c/qdance"),
            }
        ])
    })
    WA.room.area.onLeave("Youtube").subscribe(closePopup)

    WA.room.area.onEnter("Newsletter").subscribe(() => {
        currentPopup = WA.ui.openPopup("NewsletterPopup", "Subscribe to our Newsletter", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://shop.q-dance.com/network"),
            }
        ])
    })
    WA.room.area.onLeave("Newsletter").subscribe(closePopup)

    WA.room.area.onEnter("Website").subscribe(() => {
        currentPopup = WA.ui.openPopup("WebsitePopup", "Visit our Website", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://www.q-dance.com/network/library"),
            }
        ])
    })
    WA.room.area.onLeave("Website").subscribe(closePopup)

    WA.room.area.onEnter("Survey").subscribe(() => {
        currentPopup = WA.ui.openPopup("SurveyPopup", "Become a member", [
            {
                label: 'Hell yeah!',
                className: 'primary',
                callback: () => WA.nav.openTab("https://shop.q-dance.com/network"),
            }
        ])
    })
    WA.room.area.onLeave("Survey").subscribe(closePopup)

    // SIGNS POPUPS
    WA.room.area.onEnter("Sign1").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign1Popup", "<- Ticket Office\n<- Social networks\nMovie Theater ->\nMerchandising ->", [])
    })
    WA.room.area.onLeave("Sign1").subscribe(closePopup)

    WA.room.area.onEnter("Sign2").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign2Popup", "<- Photo Gallery\n<- Ticket Office", [])
    })
    WA.room.area.onLeave("Sign2").subscribe(closePopup)

    WA.room.area.onEnter("Sign3").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign3Popup", "Teleport Area ->\nMovie Theater ->", [])
    })
    WA.room.area.onLeave("Sign3").subscribe(closePopup)

    WA.room.area.onEnter("Sign4").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign4Popup", "Information Point\n\n<- Merchandising\Teleport Area ->", [])
    })
    WA.room.area.onLeave("Sign4").subscribe(closePopup)

    WA.room.area.onEnter("Sign5").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign5Popup", "Chill-Out", [])
    })
    WA.room.area.onLeave("Sign5").subscribe(closePopup)

    WA.room.area.onEnter("Sign6").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign6Popup", "Social networks ->\nMusic Area ->\nSecret Area ->\n<- Chill-Out", [])
    })
    WA.room.area.onLeave("Sign6").subscribe(closePopup)

    WA.room.area.onEnter("Sign7").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign7Popup", "<- Merchandising\n<- Teleport Area\n<- Games", [])
    })
    WA.room.area.onLeave("Sign7").subscribe(closePopup)

    WA.room.area.onEnter("Sign8").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign8Popup", "Welcome to the\nMain Stage", [])
    })
    WA.room.area.onLeave("Sign8").subscribe(closePopup)

    WA.room.area.onEnter("Sign9").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign9Popup", "VIP", [])
    })
    WA.room.area.onLeave("Sign9").subscribe(closePopup)

    WA.room.area.onEnter("Sign10").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign10Popup", "VIP", [])
    })
    WA.room.area.onLeave("Sign10").subscribe(closePopup)

    WA.room.area.onEnter("Sign11").subscribe(() => {
        currentPopup = WA.ui.openPopup("Sign11Popup", "Meet & Greet", [])
    })
    WA.room.area.onLeave("Sign11").subscribe(closePopup)

    // TOILET / SECRET POPUPS
    WA.room.area.onEnter("Toilet1").subscribe(() => {
        currentPopup = WA.ui.openPopup("Toilet1Popup", "You hear \"It's busy!\"... Come back later.", [])
    })
    WA.room.area.onLeave("Toilet1").subscribe(closePopup)

    WA.room.area.onEnter("Toilet2").subscribe(() => {
        currentPopup = WA.ui.openPopup("Toilet2Popup", "Peeing in the metaverse... no we are not there, yet.", [])
    })
    WA.room.area.onLeave("Toilet2").subscribe(closePopup)

    WA.room.area.onEnter("Toilet3").subscribe(() => {
        currentPopup = WA.ui.openPopup("Toilet3Popup", "Don't you have something better to do?", [])
    })
    WA.room.area.onLeave("Toilet3").subscribe(closePopup)

    WA.room.area.onEnter("Secret").subscribe(() => {
        currentPopup = WA.ui.openPopup("SecretPopup", "Pick a Hand", [
            {
                label: 'Left',
                className: 'primary',
                callback: () => WA.nav.goToRoom("/@/portal"),
            },
            {
                label: 'Right',
                className: 'primary',
                callback: () => WA.nav.openTab("https://giphy.com/embed/lS1H8QDzB9BbQUhHL2"),
            }
        ])
    })
    WA.room.area.onLeave("Secret").subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close()
        currentPopup = undefined
    }
}

export {};
