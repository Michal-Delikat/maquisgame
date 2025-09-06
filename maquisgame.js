/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * Maquis implementation : © Michał Delikat michal.delikat0@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * maquisgame.js
 *
 * MaquisSolo user interface script
 * 
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    getLibUrl('bga-animations', '1.x'),
],
function (dojo, declare) {
    return declare("bgagame.maquisgame", ebg.core.gamegui, {
        constructor: function() {
            // console.log('maquisgame constructor');
              
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;
        },
        
        setup: function(gamedatas) {
            // console.log("Starting game setup");

            let currentRound = parseInt(gamedatas.roundData.round);
            let currentMorale = parseInt(gamedatas.roundData.morale);

            let placedWorkers = parseInt(gamedatas.roundData.placed_resistance);
            let activeWorkers = parseInt(gamedatas.roundData.active_resistance);
            let resistanceToRecruit = parseInt(gamedatas.roundData.resistance_to_recruit);

            let placedMilice = parseInt(gamedatas.roundData.placed_milice);
            let activeMilice = parseInt(gamedatas.activeMilice);
            let miliceInGame = parseInt(gamedatas.roundData.milice_in_game);

            let placedSoldiers = parseInt(gamedatas.roundData.placed_soldiers);
            let activeSoldiers = parseInt(gamedatas.roundData.active_soldiers);

            let board = gamedatas.board;
            let spacesWithItems = Object.values(gamedatas.spacesWithItems);
            let spacesWithRooms = Object.values(gamedatas.spacesWithRooms);
            let discardedPatrolCards = gamedatas.discardedPatrolCards;
            let resources = gamedatas.resources;
            let completedMissions = Object.values(gamedatas.completedMissions);
            let selectedMissions = Object.values(gamedatas.selectedMissions);
            let rooms = Object.values(gamedatas.rooms);

            let player_id = gamedatas.currentPlayerID;

            let player_board_div = $('player_board_' + player_id);

            // PLAYER INFO

            dojo.place(`
                <div id="custom-player-board">
                    <div id="workers">
                        <div id="resistance">
                            <div id="resistance-worker-icon"></div>
                            <div id="resistance-worker-numbers">
                                <span id="placed-resistance">${placedWorkers}</span>
                                <span>|</span>
                                <span id="active-resistance">${activeWorkers}</span>
                                <span>|</span>
                                <span id="resistance-to-recruit">${resistanceToRecruit}</span>
                            </div>
                        </div>
                        <div id="milice">
                            <div id="milice-worker-icon"></div>
                            <div id="milice-worker-numbers">
                                <span id="placed-milice">${placedMilice}</span>
                                <span>|</span>
                                <span id="active-milice">${activeMilice}</span>
                                <span>|</span>
                                <span id="milice-in-game">${miliceInGame}</span>
                            </div>
                        </div>
                        <div id="soldiers">
                            <div id="soldier-worker-icon"></div>
                            <div id="soldier-worker-numbers">
                                <span id="placed-soldiers">${placedSoldiers}</span>
                                <span>|</span>
                                <span id="active-soldiers">${activeSoldiers}</span>
                                <span>|</span>
                                <span id="soldiers-in-game">5</span>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div id="resources"></div>
                </div>
            `, player_board_div);

            // RESOURCES
            
            Object.values(resources).forEach(({resource_name, quantity, available}) => dojo.place(`
                <div class="resource-box">
                    <div id="${resource_name}-icon" class="resource-icon"></div>
                    <span id=${resource_name}-quantity>${quantity}</span>/<span id=${resource_name}-available>${available}</span>
                <div>    
            `, 'resources'));

            dojo.place(`
                <div id="board-and-missions">
                    <div id="mission-cards">
                        <div id="mission-slot-1" class="mission-slot">
                            <div id="mission-${selectedMissions[0].mission_id}" class="card mission-card">
                                <div class="mission-card-back mission-card-face"></div>
                                <div class="mission-card-front mission-card-face"></div>
                                <div id="space-18" class="space mission-space mission-space-1">
                                    <div id="space-18-worker-space" class="worker-space"></div>
                                    <div id="space-18-marker-space" class="marker-space"></div>
                                    <div id="space-18-background-space" class="background-space"></div>
                                </div>
                                <div id="space-19" class="space mission-space mission-space-2">
                                    <div id="space-19-worker-space" class="worker-space"></div>
                                    <div id="space-19-marker-space" class="marker-space"></div>
                                    <div id="space-19-background-space" class="background-space"></div>
                                </div>
                                <div id="space-20" class="space mission-space mission-space-3">
                                    <div id="space-20-worker-space" class="worker-space"></div>
                                    <div id="space-20-marker-space" class="marker-space"></div>
                                    <div id="space-20-background-space" class="background-space"></div>
                                </div>
                            </div>
                        </div>
                        <div id="mission-slot-2" class="mission-slot">
                            <div id="mission-${selectedMissions[1].mission_id}" class="card mission-card">
                                <div class="mission-card-back mission-card-face"></div>
                                <div class="mission-card-front mission-card-face"></div>
                                <div id="space-21" class="space mission-space mission-space-1">
                                    <div id="space-21-worker-space" class="worker-space"></div>
                                    <div id="space-21-marker-space" class="marker-space"></div>
                                    <div id="space-21-background-space" class="background-space"></div>
                                </div>
                                <div id="space-22" class="space mission-space mission-space-2">
                                    <div id="space-22-worker-space" class="worker-space"></div>
                                    <div id="space-22-marker-space" class="marker-space"></div>
                                    <div id="space-22-background-space" class="background-space"></div>
                                </div>
                                <div id="space-23" class="space mission-space mission-space-3">
                                    <div id="space-23-worker-space" class="worker-space"></div>
                                    <div id="space-23-marker-space" class="marker-space"></div>
                                    <div id="space-23-background-space" class="background-space"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="board">
                        <div id="spaces"></div>
                        <div id="round-number-spaces"></div>
                    </div>
                </div>
                <div id="right-panel">
                    <div id="cards">
                        <div id="morale-and-soldiers-track" class="card">
                            <div id="morale-track"></div>
                            <div id="soldiers-track"></div>
                        </div>
                        <div id="patrol-deck" class="card"></div>
                        <div id="patrol-card-resolve-area" class="card"></div>
                        <div id="patrol-discard" class="card"></div>
                    </div>
                    <div id="room-tiles"></div>
                </div>
            `, 'game_play_area');

            // FLIP MISSIONS 

            completedMissions.forEach(mission => this.flipMission(mission['mission_id']));

            // MORALE

            for (let i = 0; i <= 7; i++) {
                dojo.place(`<div id="morale-track-space-${i}" class="morale-track-space"></div>`, "morale-track");
            }

            dojo.place(`<div id="marker-morale" class="marker"></div>`, `morale-track-space-${currentMorale}`);

            // SOLDIERS

            for (let i = 0; i <= 5; i++) {
                dojo.place(`<div id="soldiers-track-space-${i}" class="soldiers-track-space"></div>`, "soldiers-track");
            }

            dojo.place('<div id="marker-soldiers" class="marker"></div>', `soldiers-track-space-${activeSoldiers}`);

            // ROUND NUMBER
            
            for (let i = 0; i < 16; i++) {
                dojo.place(`<div id="round-number-space-${i}" class="round-number-space"></div>`, 'round-number-spaces')
            }

            dojo.place(`<div id="marker-round" class="marker"></div>`, `round-number-space-${currentRound}`);
            
            // BOARD SPACES

            for (let i = 0; i < 17; i++) {
                dojo.place(`
                    <div id="space-${i + 1}" class="space board-space">
                        <div id="space-${i + 1}-room-tile-space" class="room-tile-space"></div>
                        <div id="space-${i + 1}-token-spaces" class="token-spaces"></div>
                        <div id="space-${i + 1}-marker-space" class="marker-space"></div>
                        <div id="space-${i + 1}-worker-space" class="worker-space"></div>
                        <div id="space-${i + 1}-background-space" class="background-space"></div>
                    </div>
                `, 'spaces');

                for (let j = 0; j < 5; j++) {
                    dojo.place(`
                        <div 
                            id="space-${i + 1}-token-space-${j + 1}" 
                            class="token-space"
                            style="top: ${20 * j}%"
                        ></div>
                    `, `space-${i + 1}-token-spaces`);
                }
            }

            for (let i = 1; i <= 23; i++) {
                if (board[i]) {
                    if (parseInt(board[i].has_worker)) {
                        this.placeWorker(i, false);
                    } else if (parseInt(board[i].has_milice)) {
                        this.placeMilice(i, false);
                    } else if (parseInt(board[i].has_soldier)) {
                        this.placeSoldier(i, false);
                    }

                    if (parseInt(board[i].has_marker)) {
                        this.placeMissionMarker(board[i].space_id, false);
                    }
                }
            }

            spacesWithItems.forEach(space => {
                this.placeItems(space.space_id, space.item, space.quantity, false);
            });

            
            // ROOM TILES
            
            rooms.forEach((room) => dojo.place(`
                    <div id="${room.room_id}-tile-container" class="room-tile-container">
                        <div id="room-tile-${room.room_id}" class="room-tile">
                            <div class="circle-shape"></div>
                            <div class="rectangle-shape"></div>
                        </div>
                    <div>
                `, `room-tiles`));
            
            spacesWithRooms.forEach(space => {
                this.placeRoomTile(space.space_id, space.room_id, false);
            });
            // PATROL DISCARD

            Object.values(discardedPatrolCards).forEach((card) => this.discardPatrolCard(card.type_arg, true));

            // Event Listeners

            dojo.query('.background-space').connect('click', this, "onSpaceClicked");
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            // console.log("Ending game setup");
        },

        ///////////////////////////////////////////////////
        //// Game & client states
        
        onEnteringState: function(stateName, args) {
            // console.log('Entering state: ' + stateName, args);
            
            switch(stateName) {
                case 'placeWorker':
                    const emptySpaces = Object.values(args.args.emptyFields);
                                        
                    emptySpaces.forEach(spaceID => {
                        let space = dojo.byId(`space-${spaceID}-background-space`);
                        if (space) dojo.addClass(space, 'available-space');
                    });

                    break;

                case 'activateWorker':
                    const spacesWithWorkers = Object.values(args.args.spaces);

                    spacesWithWorkers.forEach(spaceID => {
                        let space = dojo.byId(`space-${spaceID}-background-space`);
                        if (space) dojo.addClass(space, 'space-with-available-worker');
                    });                        

                    break;

                case 'takeAction':
                    const activeSpaceID = args.args.activeSpace;

                    let activeSpace = dojo.byId(`space-${activeSpaceID}-background-space`);
                    if (activeSpace) dojo.addClass(activeSpace, 'active-space');

                    break;

                case 'airdropSelectField':
                    const emptyFields = Object.values(args.args.emptyFields);
                    
                    emptyFields.forEach(field => {
                        let space = dojo.byId(`space-${field.space_id}-background-space`);
                        if (space) dojo.addClass(space, 'empty-field');
                    });

                    break;

                case 'shootMilice':
                    const spacesWithMilice = Object.values(args.args);

                    spacesWithMilice.forEach(spaceID => {
                        let space = dojo.byId(`space-${spaceID}-background-space`);
                        if (space) dojo.addClass(space, 'space-with-milice');
                    });
            }   
        },

        
        onLeavingState: function(stateName) {
            // console.log('Leaving state: ' + stateName);
            
            switch(stateName)
            {
                case 'placeWorker':
                    dojo.query('.available-space').removeClass('available-space');
                    break;

                case 'activateWorker':
                    dojo.query('.space-with-available-worker').removeClass('space-with-available-worker');
                    break;

                case 'takeAction':
                    dojo.query('.active-space').removeClass('active-space');
                    break;

                case 'airdropSelectSupplies':
                    dojo.query('.empty-field').removeClass('empty-field');
                    break;

                case 'shootMilice':
                    dojo.query('.space-with-milice').removeClass('space-with-milice');
            }          
        }, 
        
        onUpdateActionButtons: function(stateName, args) {
            // console.log('onUpdateActionButtons: ' + stateName, args);
                      
            if(this.isCurrentPlayerActive())
            {            
                switch(stateName) {
                    case 'activateWorker':
                        if (args.canShoot) {
                            this.addActionButton('actDeclareShootingMilice-btn', _('Shoot milice'), () => this.bgaPerformAction("actDeclareShootingMilice"), null, null, 'gray');
                        }
                        break;

                    case 'takeAction':
                        Object.values(args.actions).forEach(action => this.addActionButton('actTakeAction_' + `${action.action_name}`, (`${action.action_description}`), () => this.bgaPerformAction("actTakeAction", { actionName: action.action_name }), null, null, action.action_name == 'return' ? 'gray' : 'blue'));
                        this.addActionButton('actBack', _('Back'), () => this.bgaPerformAction("actBack"), null, null, 'red');
                        break;

                    case 'airdropSelectSupplies':
                        Object.values(args.options).forEach(option => this.addActionButton('actAirdropSelectSupplies_' + `${option["resourceName"]}`, (`${option["airdropOptionDescription"]}`), () => this.bgaPerformAction("actSelectSupplies", { supplyType: option["resourceName"]}), null, null, 'blue'));
                        break;

                    case 'selectSpareRoom':
                        Object.values(args).forEach(room => this.addActionButton('actSelectRoom_' + `${room.room_id}`, (`${room.room_name}`), () => this.bgaPerformAction("actSelectRoom", { roomID: room.room_id}), null, null, 'blue'));
                        break;

                    case 'shootMilice':
                        this.addActionButton('actReturn', _('Back'), () => this.bgaPerformAction("actBack"), null, null, 'red');
                        break;
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        placeWorker: async function(spaceID, animate = true) {
            const workerIDs = dojo.query(".resistance").map(node => node.id);            
            let availableWorkerIDs = [1, 2, 3, 4, 5].filter((id) => !workerIDs.includes('resistance-' + id));
            const workerID = availableWorkerIDs[0];

            dojo.place(`<div id="resistance-${workerID}" class="worker resistance"></div>`, `space-${spaceID}-worker-space`);            
            if (animate) {
                this.placeOnObject(`resistance-${workerID}`, 'resistance-worker-icon');
                const animation = this.slideToObject(`resistance-${workerID}`, `space-${spaceID}-worker-space`);
                await this.bgaPlayDojoAnimation(animation);
            }
        },
        
        placeMilice: async function(spaceID, animate = true) {
            const miliceIDs = dojo.query(".milice").map(node => node.id);
            const miliceID = miliceIDs.length;

            dojo.place(`<div id="milice-${miliceID}" class="worker milice"></div>`, `space-${spaceID}-worker-space`);
            if (animate) {
                this.placeOnObject(`milice-${miliceID}`, 'player_boards');
                const animation = this.slideToObject(`milice-${miliceID}`, `space-${spaceID}-worker-space`);
                await this.bgaPlayDojoAnimation(animation);
            }
        },

        placeSoldier: async function(spaceID, animate = true) {
            const soldierIDs = dojo.query(".soldier").map(node => node.id);
            const soldierID = soldierIDs.length;

            dojo.place(`<div id="soldier-${soldierID}" class="worker soldier"></div>`, `space-${spaceID}-worker-space`);
            if (animate) {
                this.placeOnObject(`soldier-${soldierID}`, 'player_boards');
                const animation = this.slideToObject(`soldier-${soldierID}`, `space-${spaceID}-worker-space`);
                await this.bgaPlayDojoAnimation(animation);
            }
        },

        discardPatrolCard: async function(patrolCardID, animate = true) {
            dojo.place(`
                <div id="patrol-${patrolCardID}" class="card patrol-card">
                    <div class="card patrol-card-back"></div>
                    <div class="card patrol-card-front"></div>
                </div>`, 'patrol-discard');
            if (animate) {
                this.placeOnObject(`patrol-${patrolCardID}`, 'patrol-deck');
                dojo.toggleClass(dojo.byId(`patrol-${patrolCardID}`), 'flipped');
                const slideAnimation = this.slideToObjectPos(`patrol-${patrolCardID}`, `patrol-discard`, 0, 0, 2000);
                await this.bgaPlayDojoAnimation(slideAnimation);
            }
        },

        removeWorker: async function(spaceID) {
            let space = dojo.byId(`space-${spaceID}-worker-space`);
            let resistanceID = space.firstElementChild.id;

            const animation = this.slideToObject(`${resistanceID}`, 'resistance-worker-icon');
            await this.bgaPlayDojoAnimation(animation);
            dojo.destroy(`${resistanceID}`);
        },

        removePatrol: async function(spaceID) {
            let space = dojo.byId(`space-${spaceID}-worker-space`);
            let patrolID = space.firstElementChild.id;

            const animation = this.slideToObject(`${patrolID}`, "player_boards");
            await this.bgaPlayDojoAnimation(animation);
            dojo.destroy(`${patrolID}`);
        },

        placeItems: async function(spaceID, itemType, quantity, animate = true) {
            for (let i = 0; i < quantity; i++) {
                let tokenID = `${itemType}-token-${i + 1}`;
                let targetID = `space-${spaceID}-token-space-${i + 1}`;

                dojo.place(`<div id=${tokenID} class="token ${itemType}-token"></div>`, targetID);
                if (animate) {
                    this.placeOnObject(tokenID, `${itemType}-icon`);
                    const animation = this.slideToObject(tokenID, targetID);
                    await this.bgaPlayDojoAnimation(animation);
                }
            }
        },

        removeItems: async function(spaceID) {
            for (let i = 5; i > 0; i--) {
                let space = dojo.byId(`space-${spaceID}-token-space-${i}`);
                if (space.firstElementChild) {
                    let itemTokenID = space.firstElementChild.id;
                    let itemType = itemTokenID.split("-")[0];
                    const animation = this.slideToObject(`${itemTokenID}`, "player_boards");
                    await this.bgaPlayDojoAnimation(animation);
                    dojo.destroy(`${itemTokenID}`);
                }
            }
        },

        moveRoundMarker: async function(round) {
            const animation = this.slideToObject("marker-round", `round-number-space-${round}`);
            await this.bgaPlayDojoAnimation(animation);
        },

        moveMoraleMarker: async function(morale) {
            const animation = this.slideToObject("marker-morale", `morale-track-space-${morale}`);
            await this.bgaPlayDojoAnimation(animation);
        },

        moveSoldiersMarker: async function(soldiersNumber) {
            const animation = this.slideToObject("marker-soldiers", `soldiers-track-space-${soldiersNumber}`);
            await this.bgaPlayDojoAnimation(animation);
        },

        placeMissionMarker: async function(spaceID, animate = true) {
            const markerIDs = dojo.query(".marker-mission").map(node => node.id);
            const markerID = markerIDs.length

            dojo.place(`<div id="mission-marker-${markerID}" class="marker marker-mission"></div>`, `space-${spaceID}-marker-space`);
            if (animate) {
                this.placeOnObject(`mission-marker-${markerID}`, 'player_boards');
                const animation = this.slideToObject(`mission-marker-${markerID}`, `space-${spaceID}-marker-space`);
                await this.bgaPlayDojoAnimation(animation);
            }
        },

        removeMarker: async function(spaceID) {
            let space = dojo.byId(`space-${spaceID}-marker-space`);
            let markerID = space.firstElementChild.id;

            const animation = this.slideToObject(`${markerID}`, "player_boards");
            await this.bgaPlayDojoAnimation(animation);
            dojo.destroy(`${markerID}`);
        },

        flipMission: function(missionID) {
            dojo.toggleClass(dojo.byId(`mission-${missionID}`), 'flipped');
        },

        placeRoomTile: async function(spaceID, roomID, animate = true) {
            dojo.destroy(`room-tile-${roomID}`);
            dojo.place(`
                <div id="room-tile-${roomID}" class="room-tile">
                    <div class="circle-shape"></div>
                    <div class="rectangle-shape"></div>
                </div>`, `space-${spaceID}-room-tile-space`);
            if (animate) {
                this.placeOnObject(`room-tile-${roomID}`, `${roomID}-tile-container`);
                const slideAnimation = this.slideToObjectPos(`room-tile-${roomID}`, `space-${spaceID}-room-tile-space`, 0, 0, 1000);
                await this.bgaPlayDojoAnimation(slideAnimation);
                const node = dojo.query(`#${roomID}-tile-container`)[0];
                this.smoothRemove(node);
            } else {
                dojo.destroy(`${roomID}-tile-container`);
            }
            
        },

        displayModalWithCard: function(cardId, title) {
            let dialog = new ebg.popindialog();
            dialog.create('cardDialog');
            dialog.setTitle(title);
            dialog.setContent(`<div id="patrol-${cardId}" class="card patrol-card"></div>`);
            // dialog.resize(200, 300);
            dialog.show();
        },

        ///////////////////////////////////////////////////
        //// Player's action's handlers

        onSpaceClicked: function(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            var space = evt.currentTarget.id.split('-');
            var spaceID = space[1];
            
            if (evt.currentTarget.classList.contains('available-space')) {
                this.bgaPerformAction("actPlaceWorker", {
                    spaceID: spaceID
                });
            }
            else if (evt.currentTarget.classList.contains('space-with-available-worker')) {
                this.bgaPerformAction("actActivateWorker", {
                    spaceID: spaceID
                });
            }
            else if (evt.currentTarget.classList.contains('empty-field')) {
                this.bgaPerformAction("actSelectField", {
                    spaceID: spaceID
                });
            }
            else if (evt.currentTarget.classList.contains('space-with-milice')) {
                this.bgaPerformAction("actShootMilice", {
                    spaceID: spaceID
                });
            }
        },
        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        setupNotifications: function() {
            // console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            //

            this.bgaSetupPromiseNotifications();
        },
        
        notif_workerPlaced: function({spaceID}) {
            this.placeWorker(spaceID);
        },

        notif_patrolPlaced: function({placeSoldier, spaceID}) {
            if (placeSoldier) {
                this.placeSoldier(spaceID);
            } else {
                this.placeMilice(spaceID);
            }
        },
        
        notif_patrolCardDiscarded: function({patrolCardID}) {
            this.discardPatrolCard(patrolCardID);
        },

        notif_workerRemoved: function(notif) {
            this.removeWorker(notif.activeSpace);
        },

        notif_patrolRemoved: function({spaceID}) {
            this.removePatrol(spaceID);
        },

        notif_placedResistanceUpdated: function(notif) {
            dojo.byId(`placed-resistance`).innerHTML = notif.placedResistance;
        },

        notif_resistanceToRecruitUpdated: function({resistanceToRecruit}) {
            dojo.byId(`resistance-to-recruit`).innerHTML = resistanceToRecruit;
        },

        notif_placedMiliceUpdated: function({placedMilice}) {
            dojo.byId(`placed-milice`).innerHTML = placedMilice;
        },

        notif_roundDataUpdated: function({round, morale}) {
            this.moveRoundMarker(round);
            this.moveMoraleMarker(morale);
        },

        notif_moraleUpdated: function({morale}) {
            this.moveMoraleMarker(morale);
        },

        notif_resourcesChanged: function({resource_name, quantity, available}) {
            dojo.byId(`${resource_name}-quantity`).innerHTML = quantity;
            dojo.byId(`${resource_name}-available`).innerHTML = available;
        },

        notif_activeResistanceUpdated: function(notif) {
            dojo.byId("active-resistance").innerHTML = notif.active_resistance;
        },

        notif_itemsPlaced: function(notif) {
            this.placeItems(notif.spaceID, notif.supplyType, notif.quantity);
        },

        notif_itemsCollected: function(notif) {
            this.removeItems(notif.spaceID)
        },

        notif_soldiersUpdated: function({newNumber}) {
            this.moveSoldiersMarker(newNumber);
        },

        notif_markerPlaced: function({spaceID}) {
            this.placeMissionMarker(spaceID);
        },

        notif_markerRemoved: function({spaceID}) {
            this.removeMarker(spaceID);
        },

        notif_missionCompleted: function({missionID, playerScore, playerId}) {
            dojo.byId("player_score_" + playerId).innerHTML = playerScore;

            this.flipMission(missionID);
        },

        notif_roomPlaced: function({roomID, spaceID}) {
            this.placeRoomTile(spaceID, roomID);
        },

        notif_cardPeeked: function({cardId}) {
            this.displayModalWithCard(cardId, "Next Patrol card");
        },
        
        notif_patrolCardsShuffled: function() {
            dojo.query('.patrol-card').forEach(node => {
                dojo.destroy(node.id);
            });
        },

        notif_darkLadyFound: function({cardId}) {
            this.displayModalWithCard(cardId, "Dark Lady found at place #1");
        },

        // UTILITY

        smoothRemove: function(node) {
            const container = node.parentNode;
            const children = Array.from(container.children);

            // --- F: record first positions ---
            const firstRects = new Map();
            children.forEach(child => {
                firstRects.set(child, child.getBoundingClientRect());
            });

            // --- L: remove the node ---
            dojo.destroy(node);

            // --- L: record last positions ---
            children.forEach(child => {
                const lastRect = child.getBoundingClientRect();
                const firstRect = firstRects.get(child);

                if (!firstRect) return;

                // --- I: calculate deltas ---
                const dx = firstRect.left - lastRect.left;
                const dy = firstRect.top - lastRect.top;

                // Apply transform to invert position
                child.style.transform = `translate(${dx}px, ${dy}px)`;
                child.style.transition = "none"; // prevent immediate jump
            });

            // --- P: force reflow, then animate back ---
            requestAnimationFrame(() => {
                children.forEach(child => {
                    child.style.transition = "transform 300ms ease";
                    child.style.transform = "none";
                });
            });
        }
    });
});
