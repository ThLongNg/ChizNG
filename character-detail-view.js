// ========================================
// CHARACTER DETAIL VIEW - FULL IMPLEMENTATION
// Displays complete character information similar to in-game showcase
// ========================================

class CharacterDetailView {
  constructor() {
    this.eidolonDatabase = this.initEidolonDatabase();
    this.traceDatabase = this.initTraceDatabase();
    this.relicSetNames = this.initRelicSetNames();
    this.lightConeNames = this.initLightConeNames();
  }

  // ========== LIGHT CONE NAMES DATABASE ==========
  initLightConeNames() {
    return {
      // 5-Star Light Cones
      23000: 'Night on the Milky Way',
      23001: 'In the Night',
      23002: 'Something Irreplaceable',
      23003: 'But the Battle Isn\'t Over',
      23004: 'In the Name of the World',
      23005: 'Moment of Victory',
      23006: 'Patience Is All You Need',
      23007: 'Incessant Rain',
      23008: 'Echoes of the Coffin',
      23009: 'The Unreachable Side',
      23010: 'Before Dawn',
      23011: 'She Already Shut Her Eyes',
      23012: 'Sleep Like the Dead',
      23013: 'Time Waits for No One',
      23014: 'I Shall Be My Own Sword',
      23015: 'Brighter Than the Sun',
      23016: 'Worrisome, Blissful',
      23017: 'Night of Fright',
      23018: 'An Instant Before A Gaze',
      23019: 'Past Self in Mirror',
      23020: 'Baptism of Pure Thought',
      23021: 'Earthly Escapade',
      23022: 'Reforged Remembrance',
      23023: 'Inherently Unjust Destiny',
      23024: 'Along the Passing Shore',
      23025: 'Whereabouts Should Dreams Rest',
      23026: 'Yet Hope Is Priceless',
      23027: 'Sailing Towards a Second Life',
      23028: 'Flowing Nightglow',
      23029: 'Eternal Calculus',
      23030: 'Scent Alone Stays True',
      23031: 'Dance at Sunset', // v3.0 - Castorice signature
      23032: 'Time Woven Into Gold', // v3.0 - Tribbie signature
      23033: 'For I Have Touched the Sky', // v3.0 - Mydei signature
      
      // 4-Star Light Cones
      21000: 'Post-Op Conversation',
      21001: 'Good Night and Sleep Well',
      21002: 'Day One of My New Life',
      21003: 'Only Silence Remains',
      21004: 'Memories of the Past',
      21005: 'The Moles Welcome You',
      21006: 'The Birth of the Self',
      21007: 'Shared Feeling',
      21008: 'Eyes of the Prey',
      21009: 'Landau\'s Choice',
      21010: 'Swordplay',
      21011: 'Planetary Rendezvous',
      21012: 'A Secret Vow',
      21013: 'Make the World Clamor',
      21014: 'Perfect Timing',
      21015: 'Resolution Shines As Pearls of Sweat',
      21016: 'Trend of the Universal Market',
      21017: 'Subscribe for More!',
      21018: 'Dance! Dance! Dance!',
      21019: 'Under the Blue Sky',
      21020: 'Geniuses\' Repose',
      21021: 'Quid Pro Quo',
      21022: 'Fermata',
      21023: 'We Are Wildfire',
      21024: 'River Flows in Spring',
      21025: 'Past and Future',
      21026: 'Woof! Walk Time!',
      21027: 'The Seriousness of Breakfast',
      21028: 'Warmth Shortens Cold Nights',
      21029: 'We Will Meet Again',
      21030: 'This Is Me!',
      21031: 'Return to Darkness',
      21032: 'Carve the Moon, Weave the Clouds',
      21033: 'Nowhere to Run',
      21034: 'Today Is Another Peaceful Day',
      21035: 'What Is Real?',
      21036: 'Dreamville Adventure',
      21037: 'Final Victor',
      21038: 'Flames Afar',
      21039: 'Indelible Promise',
      21040: 'Concert for Two',
      21041: 'Boundless Choreo',
      21042: 'After the Charmony Fall',
      21043: 'Poised to Bloom',
      21044: 'Shadowed by Night',
      21045: 'Those Many Springs',
      21046: 'Ninja Record: Sound Hunt', // v3.0
      21047: 'Boundless Choreo', // v3.0
      21048: 'Reforged Remembrance', // v3.0
      21049: 'Before the Tutorial Mission Starts', // v3.0
      21050: 'Courage, Flowing Eternally', // v3.0
      
      // 3-Star Light Cones
      20000: 'Arrows',
      20001: 'Cornucopia',
      20002: 'Collapsing Sky',
      20003: 'Amber',
      20004: 'Void',
      20005: 'Chorus',
      20006: 'Data Bank',
      20007: 'Darting Arrow',
      20008: 'Fine Fruit',
      20009: 'Shattered Home',
      20010: 'Defense',
      20011: 'Loop',
      20012: 'Meshing Cogs',
      20013: 'Passkey',
      20014: 'Adversarial',
      20015: 'Multiplication',
      20016: 'Mutual Demise',
      20017: 'Pioneering',
      20018: 'Hidden Shadow',
      20019: 'Mediation',
      20020: 'Sagacity'
    };
  }

  // ========== EIDOLON DATABASE ==========
  initEidolonDatabase() {
    return {
      // Amphoreus Characters (v3.0+) - CORRECT ID MAPPING
      1402: [ // Aglaea
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ],
      1407: [ // Castorice
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ],
      1408: [ // Phainon
        'Epics, Born on a Blank Slate',
        'A Tomorrow in Thirteen Shades',
        'By Thy Being, As I\'ve Written',
        'Please Write On, With a Smile',
        'Gaze, Steeped in Yesterbloom',
        'Remembrance, Sung in Ripples ♪'
      ],
      1409: [ // Hyacine
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ],
      1410: [ // Hysilens
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ],
      1412: [ // Cerydra
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ],
      1415: [ // Cyrene
        'Verse I: Nascent Bloom',
        'Verse II: Eternal Spring',
        'Verse III: Frozen Heart',
        'Verse IV: Winter\'s End',
        'Verse V: Rebirth',
        'Verse VI: The Final Bloom'
      ]
      // Fallback will use generic names for other characters
    };
  }

  // ========== TRACE/SKILL DATABASE ==========
  initTraceDatabase() {
    return {
      // Amphoreus Characters (v3.0+) - CORRECT ID MAPPING
      1402: [ // Aglaea
        { name: 'Basic Attack', type: 'basic' },
        { name: 'Skill', type: 'skill' },
        { name: 'Ultimate', type: 'ultimate' },
        { name: 'Talent', type: 'talent' }
      ],
      1407: [ // Castorice
        { name: 'Basic Attack', type: 'basic' },
        { name: 'Skill', type: 'skill' },
        { name: 'Ultimate', type: 'ultimate' },
        { name: 'Talent', type: 'talent' }
      ],
      1408: [ // Phainon
        { name: 'Lo, Hope Takes Flight!', type: 'basic' },
        { name: 'Bloom, Elysium of Beyond', type: 'skill' },
        { name: 'Verse ◦ Vow ∞', type: 'ultimate' },
        { name: 'Hearts Gather as One', type: 'talent' }
      ],
      1409: [ // Hyacine
        { name: 'Basic Attack', type: 'basic' },
        { name: 'Skill', type: 'skill' },
        { name: 'Ultimate', type: 'ultimate' },
        { name: 'Talent', type: 'talent' }
      ],
      1410: [ // Hysilens
        { name: 'Basic Attack', type: 'basic' },
        { name: 'Skill', type: 'skill' },
        { name: 'Ultimate', type: 'ultimate' },
        { name: 'Talent', type: 'talent' }
      ],
      1412: [ // Cerydra
        { name: 'Basic Attack', type: 'basic' },
        { name: 'Skill', type: 'skill' },
        { name: 'Ultimate', type: 'ultimate' },
        { name: 'Talent', type: 'talent' }
      ],
      1415: [ // Cyrene
        { name: 'Frozen Petal', type: 'basic' },
        { name: 'Ice Blossom', type: 'skill' },
        { name: 'Eternal Winter', type: 'ultimate' },
        { name: 'Cryogenic Field', type: 'talent' }
      ]
      // Fallback will use generic names for other characters
    };
  }

  // ========== RELIC SET NAMES ==========
  initRelicSetNames() {
    return {
      // 4-piece Cavern Relics
      101: 'Passerby of Wandering Cloud',
      102: 'Musketeer of Wild Wheat',
      103: 'Knight of Purity Palace',
      104: 'Hunter of Glacial Forest',
      105: 'Champion of Streetwise Boxing',
      106: 'Guard of Wuthering Snow',
      107: 'Firesmith of Lava-Forging',
      108: 'Genius of Brilliant Stars',
      109: 'Band of Sizzling Thunder',
      110: 'Eagle of Twilight Line',
      111: 'Thief of Shooting Meteor',
      112: 'Wastelander of Banditry Desert',
      113: 'Longevous Disciple',
      114: 'Messenger Traversing Hackerspace',
      115: 'The Ashblazing Grand Duke',
      116: 'Prisoner in Deep Confinement',
      117: 'Pioneer Diver of Dead Waters',
      118: 'Watchmaker, Master of Dream Machinations',
      119: 'Iron Cavalry Against the Scourge',
      120: 'The Wind-Soaring Valorous',
      121: 'Sacerdos\' Relived Ordeal',
      122: 'Scholar Lost in Erudition',
      123: 'Hero of Triumphant Song', // v3.0
      
      // New Amphoreus Cavern Relics (v3.0+) - All pieces
      611: 'World-Remaking Deliverer',
      612: 'World-Remaking Deliverer',
      613: 'World-Remaking Deliverer',
      614: 'World-Remaking Deliverer',
      
      621: 'Bard of Eternal Resonance',
      622: 'Bard of Eternal Resonance',
      623: 'Bard of Eternal Resonance',
      624: 'Bard of Eternal Resonance',
      
      631: 'Hero of Triumphant Song',
      632: 'Hero of Triumphant Song',
      633: 'Hero of Triumphant Song',
      634: 'Hero of Triumphant Song',
      
      // 2-piece Planar Ornaments
      301: 'Space Sealing Station',
      302: 'Fleet of the Ageless',
      303: 'Pan-Cosmic Commercial Enterprise',
      304: 'Belobog of the Architects',
      305: 'Celestial Differentiator',
      306: 'Inert Salsotto',
      307: 'Talia: Kingdom of Banditry',
      308: 'Sprightly Vonwacq',
      309: 'Rutilant Arena',
      310: 'Broken Keel',
      311: 'Firmament Frontline: Glamoth',
      312: 'Penacony, Land of the Dreams',
      313: 'Sigonia, the Unclaimed Desolation',
      314: 'Izumo Gensei and Takama Divine Realm',
      315: 'Duran, Dynasty of Running Wolves',
      316: 'Forge of the Kalpagni Lantern',
      317: 'Lushaka, the Sunken Seas',
      318: 'The Wondrous BananAmusement Park', // v3.0
      
      // New Planar Ornaments (v3.0+) - Amphoreus
      641: 'Amphoreus, The Eternal Land',
      642: 'Amphoreus, The Eternal Land',
      
      651: 'Fate\'s Ensemble of Thespians',
      652: 'Fate\'s Ensemble of Thespians'
    };
  }

  // ========== PARSE RELIC SETS ==========
  parseRelicSets(relicList) {
    const setCounts = {};
    
    relicList.forEach(relic => {
      let tid = relic.tid || 0;
      
      // Handle hash-like TID
      if (tid > 10000000) {
        console.log('⚠️ Relic Set hash TID:', tid);
        if (relic._flat?.id) {
          tid = relic._flat.id;
          console.log('✅ Using _flat.id for set:', tid);
        } else {
          const tidStr = String(tid);
          const lastSixDigits = parseInt(tidStr.slice(-6));
          if (lastSixDigits >= 100000 && lastSixDigits <= 700000) {
            tid = lastSixDigits;
            console.log('✅ Extracted set TID:', tid);
          }
        }
      }
      
      const setId = Math.floor(tid / 10);
      const setName = this.relicSetNames[setId] || relic._flat?.setName || `Set ${setId}`;
      
      console.log(`  📦 Relic TID: ${tid}, SetID: ${setId}, SetName: ${setName}`);
      setCounts[setName] = (setCounts[setName] || 0) + 1;
    });
    
    return setCounts;
  }

  // ========== CALCULATE STATS FROM RELICS + LIGHT CONE ==========
  calculateStats(character) {
    const stats = {
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      critRate: 0,
      critDmg: 0,
      effectHitRate: 0,
      breakEffect: 0,
      energyRegen: 100, // Base 100%
      dmgBoost: {}
    };

    // Parse relics
    const relicList = character.relicList || [];
    relicList.forEach(relic => {
      if (relic._flat && relic._flat.props) {
        relic._flat.props.forEach(prop => {
          this.addStatFromProp(stats, prop);
        });
      }
    });

    // Parse light cone
    const equipment = character.equipment || {};
    if (equipment._flat && equipment._flat.props) {
      equipment._flat.props.forEach(prop => {
        this.addStatFromProp(stats, prop);
      });
    }

    console.log('📊 Calculated stats:', stats);
    return stats;
  }

  addStatFromProp(stats, prop) {
    const type = prop.type || '';
    const value = prop.value || 0;

    // HP (both flat and percentage)
    if (type.includes('HPDelta') || type.includes('HPAddedRatio')) {
      stats.hp += value;
    }
    // ATK (both flat and percentage)
    if (type.includes('AttackDelta') || type.includes('AttackAddedRatio')) {
      stats.atk += value;
    }
    // DEF (both flat and percentage)
    if (type.includes('DefenceDelta') || type.includes('DefenceAddedRatio')) {
      stats.def += value;
    }
    // SPD
    if (type.includes('Speed')) {
      stats.spd += value;
    }
    // CRIT Rate
    if (type.includes('CriticalChance')) {
      stats.critRate += value;
    }
    // CRIT DMG
    if (type.includes('CriticalDamage')) {
      stats.critDmg += value;
    }
    // Effect Hit Rate
    if (type.includes('StatusProbability')) {
      stats.effectHitRate += value;
    }
    // Break Effect
    if (type.includes('BreakDamageAddedRatio')) {
      stats.breakEffect += value;
    }
    // Energy Regen
    if (type.includes('SPRatio')) {
      stats.energyRegen += value * 100; // Convert to percentage
    }

    // DMG Boosts
    if (type.includes('PhysicalAddedRatio')) {
      stats.dmgBoost.Physical = (stats.dmgBoost.Physical || 0) + value;
    }
    if (type.includes('FireAddedRatio')) {
      stats.dmgBoost.Fire = (stats.dmgBoost.Fire || 0) + value;
    }
    if (type.includes('IceAddedRatio')) {
      stats.dmgBoost.Ice = (stats.dmgBoost.Ice || 0) + value;
    }
    if (type.includes('ThunderAddedRatio') || type.includes('LightningAddedRatio')) {
      stats.dmgBoost.Lightning = (stats.dmgBoost.Lightning || 0) + value;
    }
    if (type.includes('WindAddedRatio')) {
      stats.dmgBoost.Wind = (stats.dmgBoost.Wind || 0) + value;
    }
    if (type.includes('QuantumAddedRatio')) {
      stats.dmgBoost.Quantum = (stats.dmgBoost.Quantum || 0) + value;
    }
    if (type.includes('ImaginaryAddedRatio')) {
      stats.dmgBoost.Imaginary = (stats.dmgBoost.Imaginary || 0) + value;
    }
  }

  // ========== FORMAT STAT VALUE ==========
  formatStat(value, type = 'number') {
    if (type === 'percent') {
      return `${(value * 100).toFixed(1)}%`;
    }
    if (type === 'decimal') {
      return value.toFixed(2);
    }
    return Math.round(value).toLocaleString();
  }

  // ========== GET RELIC ICON URL ==========
  getRelicIconURL(tid) {
    if (!tid) return '';
    return `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/IconRelic/${tid}.png`;
  }

  // ========== GET SUBSTAT DISPLAY ==========
  getSubstatsHTML(subAffixList) {
    if (!subAffixList || subAffixList.length === 0) return '';
    
    const statIcons = {
      'HPDelta': '❤️', 'HPAddedRatio': '❤️',
      'AttackDelta': '⚔️', 'AttackAddedRatio': '⚔️',
      'DefenceDelta': '🛡️', 'DefenceAddedRatio': '🛡️',
      'Speed': '⚡',
      'CriticalChance': '🎯', 'CriticalDamage': '💥',
      'StatusProbability': '🎲', 'BreakDamageAddedRatio': '💢'
    };
    
    return subAffixList.map(substat => {
      const type = substat.type || '';
      const value = substat.value || 0;
      const count = substat.cnt || substat.step || 0;
      
      let displayValue = '';
      const isPercent = type.includes('Ratio') || type.includes('Chance') || type.includes('Damage') || type.includes('Probability');
      
      if (isPercent) {
        displayValue = `${(value * 100).toFixed(1)}%`;
      } else if (type.includes('Speed')) {
        displayValue = `+${value.toFixed(1)}`;
      } else {
        displayValue = `+${Math.round(value)}`;
      }
      
      const icon = statIcons[type] || '📊';
      const rolls = count > 0 ? ` +${count}` : '';
      
      return `
        <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #ddd;">
          <span>${icon}</span>
          <span>${displayValue}</span>
          <span style="color: #888; font-size: 10px;">${rolls}</span>
        </div>
      `;
    }).join('');
  }

  // ========== SHOW FULL CHARACTER DETAILS (GAME-LIKE UI) ==========
  show(character, characterName, is5Star) {
    const avatarId = character.avatarId;
    const level = character.level || 0;
    const promotion = character.promotion || 0;
    const eidolonCount = character.rank || 0;

    // Get equipment info
    const equipment = character.equipment || {};
    const lightConeTid = equipment.tid || 0;
    const lightConeName = equipment._flat?.name || this.lightConeNames[lightConeTid] || `Light Cone ${lightConeTid}`;
    const lightConeLevel = equipment.level || 0;
    const lightConeSuperimpose = equipment.rank || 1;

    // Parse relics
    const relicList = character.relicList || [];
    const relicSets = this.parseRelicSets(relicList);
    
    // Calculate stats
    const stats = this.calculateStats(character);

    // Get eidolon names
    const eidolonNames = this.eidolonDatabase[avatarId] || [
      'Eidolon 1', 'Eidolon 2', 'Eidolon 3',
      'Eidolon 4', 'Eidolon 5', 'Eidolon 6'
    ];

    // Get trace info
    const traceList = this.traceDatabase[avatarId] || [];
    const skillTreeList = character.skillTreeList || [];

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'char-detail-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      overflow-y: auto;
      animation: fadeIn 0.3s ease;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
      background: linear-gradient(135deg, #1a1520 0%, #22182a 50%, #1a1520 100%);
      border-radius: 20px;
      padding: 0;
      max-width: 1400px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      border: 3px solid #d4af37;
      box-shadow: 0 0 60px rgba(212, 175, 55, 0.3), inset 0 0 100px rgba(0, 0, 0, 0.5);
      position: relative;
      color: white;
      font-family: 'Kaisei Tokumin', serif;
      display: grid;
      grid-template-columns: 1fr 1fr;
    `;

    panel.innerHTML = `
      <!-- Close Button -->
      <button id="close-char-detail" style="
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 0, 0, 0.8);
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s;
        z-index: 10;
      ">✕</button>

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 25px;">
        <img 
          src="https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Series/${avatarId}.png"
          onerror="this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/${avatarId}.png';"
          style="
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 5px solid ${is5Star ? '#ffd700' : '#b19cd9'};
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          "
        >
        <h2 style="
          color: ${is5Star ? '#ffd700' : '#b19cd9'};
          margin: 15px 0 8px 0;
          font-size: 28px;
          text-shadow: 0 3px 10px rgba(0, 0, 0, 0.7);
        ">${characterName}</h2>
        <div style="display: flex; justify-content: center; gap: 3px;">
          ${Array(is5Star ? 5 : 4).fill(0).map(() => '<span style="color: #ffd700; font-size: 18px;">★</span>').join('')}
        </div>
      </div>

      <!-- Level & Ascension -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      ">
        <div>
          <div style="color: #888; font-size: 13px;">Level</div>
          <div style="font-size: 22px; font-weight: bold; color: #ffd700;">Lv.${level}</div>
        </div>
        <div>
          <div style="color: #888; font-size: 13px;">Ascension</div>
          <div style="font-size: 22px; font-weight: bold; color: #4af;">A${promotion}</div>
        </div>
      </div>

      <!-- Light Cone -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <div style="color: #888; font-size: 13px; margin-bottom: 8px;">Light Cone</div>
        <div style="font-size: 16px; font-weight: bold; color: #ffd700;">${lightConeName}</div>
        ${lightConeLevel > 0 ? `
          <div style="color: #aaa; font-size: 14px; margin-top: 5px;">
            Lv.${lightConeLevel} • S${lightConeSuperimpose}
          </div>
        ` : ''}
      </div>

      <!-- Relic Sets -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <div style="color: #888; font-size: 13px; margin-bottom: 8px;">Relic Sets</div>
        <div style="font-size: 14px; color: #ddd; line-height: 1.6;">
          ${relicSetsText}
        </div>
      </div>

      <!-- Stats -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <div style="color: #888; font-size: 13px; margin-bottom: 12px;">Stats</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
          ${stats.hp > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>❤️ HP</span>
              <span style="color: #4af; font-weight: bold;">${this.formatStat(stats.hp)}</span>
            </div>
          ` : ''}
          ${stats.atk > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>⚔️ ATK</span>
              <span style="color: #f44; font-weight: bold;">${this.formatStat(stats.atk)}</span>
            </div>
          ` : ''}
          ${stats.def > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>🛡️ DEF</span>
              <span style="color: #fa4; font-weight: bold;">${this.formatStat(stats.def)}</span>
            </div>
          ` : ''}
          ${stats.spd > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>⚡ SPD</span>
              <span style="color: #4f4; font-weight: bold;">${this.formatStat(stats.spd, 'decimal')}</span>
            </div>
          ` : ''}
          ${stats.critRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>🎯 CRIT Rate</span>
              <span style="color: #ff4; font-weight: bold;">${this.formatStat(stats.critRate, 'percent')}</span>
            </div>
          ` : ''}
          ${stats.critDmg > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>💥 CRIT DMG</span>
              <span style="color: #f84; font-weight: bold;">${this.formatStat(stats.critDmg, 'percent')}</span>
            </div>
          ` : ''}
          ${stats.effectHitRate > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>🎲 Effect Hit Rate</span>
              <span style="color: #9cf; font-weight: bold;">${this.formatStat(stats.effectHitRate, 'percent')}</span>
            </div>
          ` : ''}
          ${stats.breakEffect > 0 ? `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>💢 Break Effect</span>
              <span style="color: #f9f; font-weight: bold;">${this.formatStat(stats.breakEffect, 'percent')}</span>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
            <span>⚡ Energy Regen</span>
            <span style="color: #6f6; font-weight: bold;">${this.formatStat(stats.energyRegen, 'percent')}</span>
          </div>
          ${Object.entries(stats.dmgBoost).map(([element, value]) => `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
              <span>💠 ${element} DMG</span>
              <span style="color: #8df; font-weight: bold;">${this.formatStat(value, 'percent')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Eidolons -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 15px;
      ">
        <div style="color: #888; font-size: 13px; margin-bottom: 10px;">Eidolon: ${eidolonCount}/6</div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${eidolonNames.map((name, i) => `
            <div style="
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 8px;
              background: rgba(255, 255, 255, 0.05);
              border-radius: 6px;
              border-left: 3px solid ${i < eidolonCount ? '#4af' : '#555'};
            ">
              <span style="font-size: 16px;">${i < eidolonCount ? '✅' : '❌'}</span>
              <span style="
                font-size: 13px;
                color: ${i < eidolonCount ? '#fff' : '#888'};
                flex: 1;
              ">${name}</span>
            </div>
          `).join('')}
        </div>
      </div>

      ${traceList.length > 0 ? `
        <!-- Traces -->
        <div style="
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
          padding: 15px;
        ">
          <div style="color: #888; font-size: 13px; margin-bottom: 10px;">Traces</div>
          <div style="font-size: 13px; color: #ddd; line-height: 1.8;">
            ${traceList.map(trace => `${trace.name}`).join(', ')}
          </div>
        </div>
      ` : ''}

      <!-- Relics Grid with Images -->
      <div style="
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        padding: 15px;
        margin-top: 15px;
      ">
        <div style="color: #888; font-size: 13px; margin-bottom: 12px;">Equipped Relics (${relicList.length}/6)</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          ${relicList.map(relic => {
            const relicType = relic.type || 1;
            const relicLevel = relic.level || 0;
            const tid = relic.tid || 0;
            const iconURL = this.getRelicIconURL(tid);
            const typeNames = ['', 'Head', 'Hands', 'Body', 'Feet', 'Sphere', 'Rope'];
            
            return `
              <div style="
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                padding: 8px;
                text-align: center;
                border: 2px solid rgba(255, 215, 0, 0.3);
              ">
                <img 
                  src="${iconURL}"
                  onerror="this.style.display='none'"
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    margin-bottom: 5px;
                  "
                >
                <div style="font-size: 11px; color: #ffd700; font-weight: bold;">
                  ${typeNames[relicType] || 'Relic'}
                </div>
                <div style="font-size: 11px; color: #4af; margin-top: 2px;">
                  +${relicLevel}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close handlers
    const closeBtn = overlay.querySelector('#close-char-detail');
    closeBtn.addEventListener('click', () => {
      overlay.style.animation = 'fadeIn 0.2s ease reverse';
      setTimeout(() => overlay.remove(), 200);
    });

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.transform = 'rotate(90deg) scale(1.1)';
      closeBtn.style.background = 'rgba(255, 0, 0, 1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.transform = 'rotate(0deg) scale(1)';
      closeBtn.style.background = 'rgba(255, 0, 0, 0.8)';
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => overlay.remove(), 200);
      }
    });

    // ESC key
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => overlay.remove(), 200);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
}

// Export
window.CharacterDetailView = CharacterDetailView;
