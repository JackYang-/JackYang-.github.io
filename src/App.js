import React from 'react';
import './App.css';
import Relics from './Relics'; 
import SetEffects from './SetEffects'; 
import SetCombos from './SetCombos'; 

class App extends React.Component {
  constructor(props) {
    super(props);

    //todo: add some filters
    //todo: add some way to find your own combos and save them
    //todo: change the web app to something thats not called "react app"

    const createFragment = (_name, _type, _effects) => {
      return {
        name: _name,
        type: _type,
        effects: _effects
      };
    };

    const createSetEffect = (_groupId, _name, _number, _fragsList, _effects) => {
      return {
        groupId: _groupId,
        name: _name,
        reqNum: _number,
        reqFragsList: _fragsList,
        effects: _effects
      };
    }

    this.fragments = [
      /* 0 */ createFragment('Alchemaniac', 'Skilling', 'Players will receive 15/30/50% extra coins when casting High Level Alchemy on items.'),
      /* 1 */ createFragment('Arcane Conduit', 'Combat', 'Runes and magic weapon charges have a 40/60/90% chance to be saved.'),
      /* 2 */ createFragment('Armadylean Decree', 'Combat', 'When wielding four Armadylean items, enchanted bolt effects have a 25/50/100% increased chance to activate.'),
      /* 3 */ createFragment('Bandosian Might', 'Combat', 'When wielding four Bandosian items, the player\'s max hit is increased by 1/2/4 for every attack speed a weapon has.'),
      /* 4 */ createFragment('Barbarian Pest Wars', 'Miscellaneous', 'Reward currency earned for playing Barbarian Assault, Pest Control, and Soul Wars are increased by x2/x3/x4.'),
      /* 5 */ createFragment('Bottomless Quiver', 'Combat', 'Ranged ammunition and ranged weapon charges have a 40/60/90% chance to be saved, excluding chinchompas. The chances to save ammunition and charges are rolled separately.'),
      /* 6 */ createFragment('Catch Of The Day', 'Harvesting', 'All types of Fishing activities have a 1 in 300/200/80 chance, per catch, to roll the rare drop table once.'),
      /* 7 */ createFragment('Certified Farmer', 'Harvesting', 'Farming yields have a 25/50/100% chance to be doubled, and are converted to bank notes upon harvest.'),
      /* 8 */ createFragment('Chef\'s Catch', 'Harvesting', 'Players have a 20/35/50% chance of cooking a raw fish upon catching them. Cooking experience is granted, even if players do not have the level required to cook them normally.'),
      /* 9 */ createFragment('Chinchonkers', 'Harvesting', 'Catching chinchompas grant 50/100/100% more Hunter experience. At level 3, players will receive two chinchompas per successful capture.'),
      /* 10 */ createFragment('Clued In', 'Miscellaneous', 'The drop rate of scroll boxes from NPCs are increased to 1 in 30/25/15.'),
      /* 11 */ createFragment('Deeper Pockets', 'Skilling', 'Players have a 20/50/100% chance to receive double loot when pickpocketing NPCs. This stacks with rogue equipment.'),
      /* 12 */ createFragment('Dine & Dash', 'Production', 'Players have a 10/20/50% chance to receive an extra piece of cooked food while cooking. Though no extra Cooking experience is gained when this occurs, the extra food is automatically sent to the player\'s bank.'),
      /* 13 */ createFragment('Divine Restoration', 'Combat', 'Players will have their prayer points restored by one every 15/9/3.6 seconds.'),
      /* 14 */ createFragment('Dragon On A Bit', 'Production', 'Players have a 10/20/40% chance to save the materials used whilst crafting dragonhide armour. The saved materials are automatically sent to the player\'s bank.'),
      /* 15 */ createFragment('Enchanted Jeweler', 'Skilling', 'Each enchantment spell cast will enchant up to 5/10/25 pieces of jewellery, granting the full Magic experience.'),
      /* 16 */ createFragment('Golden Brick Road', 'Skilling', 'When a mark of grace appears when training on a Rooftop Agility Course, 4,000/7,000/15,000 coins will appear alongside it.'),
      /* 17 */ createFragment('Grave Robber', 'Skilling', 'The amount of hallowed marks received when looting coffins within the Hallowed Sepulchre is increased by 50/150/300%.'),
      /* 18 */ createFragment('Homewrecker', 'Harvesting', 'Players have a x2/x3/x4 chance of receiving bird nests when chopping trees, and are sent to the bank rather than falling to the ground.'),
      /* 19 */ createFragment('Hot On The Trail', 'Skilling', 'Players have a 2/5/10% chance to obtain a scroll box whilst lighting logs via Firemaking.'),
      /* 20 */ createFragment('Imcando\'s Apprentice', 'Production', 'Players have a 20/50/75% chance to craft an extra piece of gemmed jewellery, granting Crafting experience for the extra jewellery. Note that players must have spare inventory space to obtain the extra jewellery.'),
      /* 21 */ createFragment('Just Druid!', 'Production', 'Players will receive 10/20/40% extra Herblore experience for each grimy herb cleaned.'),
      /* 22 */ createFragment('Larger Recharger', 'Combat', 'Players will have their special attack energy restored by 10% every 25/20/10 seconds.'),
      /* 23 */ createFragment('Livin\' On A Prayer', 'Combat', 'The drain rate of activated prayers are reduced by 15/30/60%.'),
      /* 24 */ createFragment('Message In A Bottle', 'Miscellaneous', 'The chance of receiving clue geodes, nests, and bottles from skilling are increased by x3/x5/x10.'),
      /* 25 */ createFragment('Mixologist', 'Production', 'Players will have a 25/50/100% chance to mix a 4-dose potion rather than a 3-dose potion, with a 20/50/100% chance to save the secondary ingredient.'),
      /* 26 */ createFragment('Molten Miner', 'Harvesting', 'If applicable, ores mined have a 20/50/100% chance to be smelted into bars. Smithing experience is granted, even if players do not have the level required to smelt them normally.'),
      /* 27 */ createFragment('Mother\'s Magic Fossils', 'Miscellaneous', 'Golden nuggets from Motherlode Mine, pizzaz points from Mage Training Arena, and fossils from Fossil Island are increased by x2/x3/x4'),
      /* 28 */ createFragment('Plank Stretcher', 'Production', 'Players will have a 10/20/50% chance to save their planks whilst training Construction.'),
      /* 29 */ createFragment('Praying Respects', 'Skilling', 'Remains are automatically buried/scattered, granting 50/100/200% of the usual Prayer experience. League experience multipliers are applied.'),
      /* 30 */ createFragment('Pro Tips', 'Production', 'Players will receive 30/50/100% more bolt tips per gem whilst making them.'),
      /* 31 */ createFragment('Profletchional', 'Production', 'Fletching logs and stringing bows grant 30/50/100% more Fletching experience.'),
      /* 32 */ createFragment('Rock Solid', 'Harvesting', 'Iron, sandstone, and granite rocks have a 25/50/75% chance to not be depleted upon being mined.'),
      /* 33 */ createFragment('Rogues\' Chompy Farm', 'Miscellaneous', 'Chance of successfully cracking the wall safe at the end of the Rogue\'s Den maze is increased by 10/20/40%. Each chompy bird killed will count as 2/3/4 kills when checking chompy killcount via the ogre bow. The amount of points earned from the Tithe Farm is increased by x2/x3/x4'),
      /* 34 */ createFragment('Rooty Tooty 2x Runeys', 'Production', 'Players have a 20/40/80% chance to receive an extra rune for each rune crafted.'),
      /* 35 */ createFragment('Rumple-Bow-String', 'Production', 'The Spin Flax spell gives 10/15/27 bow strings instead of the usual 5.'),
      /* 36 */ createFragment('Rune Escape', 'Production', 'Players will no longer receive mind (lv-1)/body (lv-2)/elemental runes (lv-3) when crafting runes at the Ourania Altar.'),
      /* 37 */ createFragment('Saradominist Defence', 'Combat', 'When wielding four Saradominist items, the player\'s max hit is increased by 2/5/10 if they have taken damage in the last 2.4 seconds.'),
      /* 38 */ createFragment('Seedy Business', 'Harvesting', 'Players have a 10/25/50% chance to save their seed upon planting it in a farming patch.'),
      /* 39 */ createFragment('Slash & Burn', 'Harvesting', 'Players have a 20/35/50% chance of burning logs upon chopping them. Firemaking experience is granted, even if players do not have the level required to burn them normally.'),
      /* 40 */ createFragment('Slay \'n\' Pay', 'Combat', 'Players will earn 10/20/50% more slayer reward points upon completing a slayer task.'),
      /* 41 */ createFragment('Slay All Day', 'Combat', 'Players will heal 1/2/3 hitpoints for every monster killed as part of a slayer task.'),
      /* 42 */ createFragment('Smithing Double', 'Production', 'Players have a 5/15/30% chance to smith an extra item when smithing items at an anvil, granting Smithing experience for the extra item. Extra items will drop to the floor if players have no inventory space.'),
      /* 43 */ createFragment('Smooth Criminal', 'Skilling', 'The chance to successfully pickpocket NPCs is increased by 15/25/50%. At level 2, players will no longer take damage when stunned by a failed pickpocket attempt. The gloves of silence and Ardougne Diary bonus will stack.'),
      /* 44 */ createFragment('Special Discount', 'Combat', 'Special attacks whose energy cost is greater than 50/40/25% will cost 50/40/25% energy instead.'),
      /* 45 */ createFragment('Superior Tracking', 'Combat', 'Superior slayer monsters have a 1 in 150/100/30 chance of spawning during a slayer task for eligible slayer monsters.'),
      /* 46 */ createFragment('Tactical Duelist', 'Combat', 'Melee weapon charges have a 20/40/80% chance to be saved.'),
      /* 47 */ createFragment('Thrall Damage', 'Combat', 'The max hit of thralls are increased by x2/x3/x4. Damage is rounded up.'),
      /* 48 */ createFragment('Unholy Ranger', 'Combat', 'The player\'s accuracy for ranged weapons is increased by 30/60/100% when they have no prayer points remaining. Excludes the dwarf multicannon.'),
      /* 49 */ createFragment('Unholy Warrior', 'Combat', 'The player\'s accuracy for melee weapons is increased by 12/20/30% when they have no prayer points remaining.'),
      /* 50 */ createFragment('Unholy Wizard', 'Combat', 'The player\'s accuracy for magic attacks is increased by 40/70/125% when they have no prayer points remaining.'),
      /* 51 */ createFragment('Venomaster', 'Combat', 'The players attacks have a chance to inflict poison that starts at 3/5/7 damage. Players will gain poison immunity at level 2, and venom immunity at level 3. '),
      /* 52 */ createFragment('Zamorakian Sight', 'Combat', 'When wielding four Zamorakian items, the players accuracy for magic attacks is increased by 50/125/250%.')
    ];  //ADD NEW ONES TO THE BOTTOM IF ANY

    this.setEffects = [
      /* 0 */ createSetEffect(1, 'Absolute Unit (2) ', 2, [2, 13, 14, 36, 37, 45, 46, 51], 'Players take 30% less damage from monsters, with 50% of post-reduction damage reflected back to the attacker.'),
      /* 1 */ createSetEffect(1, 'Absolute Unit (4) ', 4, [2, 13, 14, 36, 37, 45, 46, 51], 'Players take 50% less damage from monsters, with 100% of post-reduction damage reflected back to the attacker.'),
      /* 2 */ createSetEffect(2, 'The Alchemist', 4, [7, 12, 16, 18, 21, 25, 41], 'When cooking food, making jugs of wine, cleaning grimy herbs, or mixing potions, all items in the player\'s inventory will be processed at once and reward the full amount of experience.'),
      /* 3 */ createSetEffect(3, 'Chain Magic (2)', 2, [11, 19, 27, 34, 47, 50, 52], 'Players have a 30% chance to perform another magic attack after a successful hit with magic.'),
      /* 4 */ createSetEffect(3, 'Chain Magic (3)', 3, [11, 19, 27, 34, 47, 50, 52], 'Players have a 60% chance to perform another magic attack after a successful hit with magic.'),
      /* 5 */ createSetEffect(4, 'The Craftsman', 4, [14, 17, 20, 30, 31, 35], 'When smelting ores, smithing bars and cannonballs, crafting with leather, glass, uncut gems, pottery, battlestaves, spinning flax and wool, fletching logs and cutting bolt tips, all items in the player\'s inventory will be processed at once and reward the full amount of experience.'),
      /* 6 */ createSetEffect(5, 'Double Tap (2)', 2, [2, 9, 30, 33, 35, 42, 48], 'Players have a 30% chance to perform another ranged attack after a successful hit with ranged.'),
      /* 7 */ createSetEffect(5, 'Double Tap (3)', 3, [2, 9, 30, 33, 35, 42, 48], 'Players have a 60% chance to perform another ranged attack after a successful hit with ranged.'),
      /* 8 */ createSetEffect(6, 'Drakan\'s Touch (2)', 2, [10, 22, 29, 44, 48, 50, 52], 'Successful hits have a 50% chance of restoring the player\'s hitpoints by 5% of the damage dealt.'),
      /* 9 */ createSetEffect(6, 'Drakan\'s Touch (4)', 4, [10, 22, 29, 44, 48, 50, 52], 'Successful hits have a 50% chance of restoring the player\'s hitpoints by 10% of the damage dealt. '),
      /* 10 */ createSetEffect(7, 'Endless Knowledge', 4, [0, 1, 15, 20, 27, 28, 47], 'Players receive an arcane grimoire from The Sage, which allows the ability to freely switch spellbooks anywhere. '),
      /* 11 */ createSetEffect(8, 'Fast Metabolism', 3, [3, 17, 19, 22, 32, 51], 'Hitpoint regeneration is increased by x4.'),
      /* 12 */ createSetEffect(9, 'Greedy Gatherer (3)', 3, [7, 8, 21, 24, 26, 32, 39], 'Players will receive double the resources (with full experience) from Fishing, Woodcutting, Mining, and Farming.'),
      /* 13 */ createSetEffect(9, 'Greedy Gatherer (4)', 4, [7, 8, 21, 24, 26, 32, 39], 'Players will receive triple the resources (with full experience) from Fishing, Woodcutting, Mining, and Farming.'),
      /* 14 */ createSetEffect(10, 'Knife\'s Edge (2)', 2, [4, 5, 23, 24, 29, 37, 41, 49], 'Players will deal 0.3% additional damage for every hitpoint missing.'),
      /* 15 */ createSetEffect(10, 'Knife\'s Edge (4)', 4, [4, 5, 23, 24, 29, 37, 41, 49], 'Players will deal 0.6% additional damage for every hitpoint missing.'),
      /* 16 */ createSetEffect(11, 'Last Recall', 5, [9, 10, 15, 18, 31, 34, 36, 40, 43, 45], 'Players receive a crystal of memories from The Sage, which allows them to teleport themselves back to the location where their most recent teleport occurred, with some caveats regarding its usage.'),
      /* 17 */ createSetEffect(12, 'Personal Banker (2)', 2, [0, 6, 11, 26, 38, 42], 'Resources obtained from Fishing, Woodcutting, Mining, and Farming have a 50% chance to be deposited directly to the player\'s bank.'),
      /* 18 */ createSetEffect(12, 'Personal Banker (4)', 4, [0, 6, 11, 26, 38, 42], 'Resources obtained from Fishing, Woodcutting, Mining, and Farming are deposited directly to the player\'s bank.'),
      /* 19 */ createSetEffect(13, 'Trailblazer', 3, [1, 5, 8, 16, 38, 43, 49], 'Players receive a portable waystone from The Sage, which can teleport to other waystones.'),
      /* 20 */ createSetEffect(14, 'Twin Strikes (2)', 2, [3, 4, 13, 23, 40, 44, 46], 'Players have a 30% chance to perform another melee attack after a successful hit with melee.'),
      /* 21 */ createSetEffect(14, 'Twin Strikes (3)', 3, [3, 4, 13, 23, 40, 44, 46], 'Players have a 60% chance to perform another melee attack after a successful hit with melee. '),
      /* 22 */ createSetEffect(15, 'Unchained Talent', 3, [6, 12, 25, 28, 33, 39], 'All non-combat skills are permanently boosted by +8. This boost is not limited to unlocked skills.')
    ];

    let _unlocked;
    if (localStorage && localStorage.getItem('shatteredRelicsUnlocked')) {
      //console.log(localStorage.getItem('shatteredRelicsUnlocked'));
      _unlocked = localStorage.getItem('shatteredRelicsUnlocked').split(",");
      for (let i = 0; i < _unlocked.length; i ++) {
        _unlocked[i] = _unlocked[i] === 'false' ? false : true;
      }
    } else {
      _unlocked = new Array(this.fragments.length);
      for (let i = 0; i < this.fragments.length; i ++) {
        _unlocked[i] = false;
      }
    }

    let _slots;
    if (localStorage && localStorage.getItem('shatteredRelicsSlots')) {
      _slots = parseInt(localStorage.getItem('shatteredRelicsSlots'));
    } else {
      _slots = 3;
    }

    this.state = {
        unlocked: _unlocked,
        currentTab: 'fragments',
        slots: _slots
      };
  }

  handleUnlockedChange = (newUnlocked) => {
    //console.log("parent change function called");
    localStorage.setItem('shatteredRelicsUnlocked', newUnlocked);
    this.setState({unlocked: newUnlocked});
  };

  handleSlotsChange = (event) => {
    localStorage.setItem('shatteredRelicsSlots', event.target.value);
    this.setState({slots: event.target.value});
  }

  changeTab = (newTab) => {
    this.setState({currentTab: newTab});
  }

  render() {
    let content;
    if (this.state.currentTab === 'fragments') {
      content = <Relics fragments={this.fragments} unlocked={this.state.unlocked} handleChange={(newUnlocked) => this.handleUnlockedChange(newUnlocked)} />;
    } else if (this.state.currentTab === 'setEffects') {
      content = <SetEffects fragments={this.fragments} unlocked={this.state.unlocked} setEffects={this.setEffects} />;
    } else if (this.state.currentTab === 'setCombos') {
      content = <SetCombos fragments={this.fragments} unlocked={this.state.unlocked} setEffects={this.setEffects} slots={this.state.slots} />;
    }

    return (
      <div>
        <div id='topbar'>
          <div className='topbar-row'>
            <div className="topbar-item">
              Slots:&nbsp;
              <select value={this.state.slots} onChange={this.handleSlotsChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
              </select>
            </div>
            <div className="topbar-item topbar-button" onClick={() => this.changeTab('fragments')}>Fragments</div>
            <div className="topbar-item topbar-button" onClick={() => this.changeTab('setEffects')}>Set Effects</div>
            <div className="topbar-item topbar-button" onClick={() => this.changeTab('setCombos')}>Set Combinations</div>
          </div>
        </div>
        <div id="topbar-placeholder"></div>
        {content}
      </div>
    );
  }
}

export default App;
