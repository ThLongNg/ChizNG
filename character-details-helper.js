// Helper functions for character details parsing
class CharacterDetailsHelper {
  
  // Get eidolon names for each character
  static getEidolonNames(avatarId) {
    const eidolonData = {
      1415: [ // Phainon
        'Epics, Born on a Blank Slate',
        'A Tomorrow in Thirteen Shades',
        'By Thy Being, As I\'ve Written',
        'Please Write On, With a Smile',
        'Gaze, Steeped in Yesterbloom',
        'Remembrance, Sung in Ripples ♪'
      ],
      1407: [ // Cyrene
        'Eidolon 1',
        'Eidolon 2',
        'Eidolon 3',
        'Eidolon 4',
        'Eidolon 5',
        'Eidolon 6'
      ]
      // Add more characters as needed
    };
    
    return eidolonData[avatarId] || [
      'Eidolon 1', 'Eidolon 2', 'Eidolon 3',
      'Eidolon 4', 'Eidolon 5', 'Eidolon 6'
    ];
  }
  
  // Get trace/skill names for each character
  static getTraceNames(avatarId) {
    const traceData = {
      1415: [ // Phainon
        'Lo, Hope Takes Flight!',
        'Bloom, Elysium of Beyond',
        'Verse ◦ Vow ∞',
        'Hearts Gather as One'
      ]
      // Add more characters as needed
    };
    
    return traceData[avatarId] || ['Skill 1', 'Skill 2', 'Ultimate', 'Talent'];
  }
  
  // Parse stats from relic flat properties
  static parseStats(relicList, equipment) {
    const stats = {
      hp: 0,
      atk: 0,
      def: 0,
      spd: 0,
      critRate: 0,
      critDmg: 0,
      effectHitRate: 0,
      breakEffect: 0,
      energyRegen: 100,
      dmgBoost: {}
    };
    
    // Parse relics
    relicList.forEach(relic => {
      if (relic._flat && relic._flat.props) {
        relic._flat.props.forEach(prop => {
          this.addStatFromProp(stats, prop);
        });
      }
    });
    
    // Parse light cone
    if (equipment && equipment._flat && equipment._flat.props) {
      equipment._flat.props.forEach(prop => {
        this.addStatFromProp(stats, prop);
      });
    }
    
    return stats;
  }
  
  static addStatFromProp(stats, prop) {
    const type = prop.type || '';
    const value = prop.value || 0;
    
    // HP
    if (type.includes('HPDelta') || type === 'MaxHP' || type.includes('HPAddedRatio')) {
      stats.hp += value;
    }
    // ATK
    if (type.includes('AttackDelta') || type === 'Attack' || type.includes('AttackAddedRatio')) {
      stats.atk += value;
    }
    // DEF
    if (type.includes('DefenceDelta') || type === 'Defence' || type.includes('DefenceAddedRatio')) {
      stats.def += value;
    }
    // SPD
    if (type.includes('Speed') || type.includes('SPD')) {
      stats.spd += value;
    }
    // CRIT Rate
    if (type.includes('CriticalChance') || type.includes('CritRate')) {
      stats.critRate += value;
    }
    // CRIT DMG
    if (type.includes('CriticalDamage') || type.includes('CritDMG')) {
      stats.critDmg += value;
    }
    // Effect Hit Rate
    if (type.includes('StatusProbability') || type.includes('EffectHitRate')) {
      stats.effectHitRate += value;
    }
    // Break Effect
    if (type.includes('BreakDamageAddedRatio') || type.includes('BreakEffect')) {
      stats.breakEffect += value;
    }
    // Energy Regen
    if (type.includes('SPRatio') || type.includes('EnergyRegen')) {
      stats.energyRegen += value;
    }
    
    // DMG Boosts
    if (type.includes('PhysicalAddedRatio')) stats.dmgBoost.Physical = (stats.dmgBoost.Physical || 0) + value;
    if (type.includes('FireAddedRatio')) stats.dmgBoost.Fire = (stats.dmgBoost.Fire || 0) + value;
    if (type.includes('IceAddedRatio')) stats.dmgBoost.Ice = (stats.dmgBoost.Ice || 0) + value;
    if (type.includes('ThunderAddedRatio') || type.includes('LightningAddedRatio')) {
      stats.dmgBoost.Lightning = (stats.dmgBoost.Lightning || 0) + value;
    }
    if (type.includes('WindAddedRatio')) stats.dmgBoost.Wind = (stats.dmgBoost.Wind || 0) + value;
    if (type.includes('QuantumAddedRatio')) stats.dmgBoost.Quantum = (stats.dmgBoost.Quantum || 0) + value;
    if (type.includes('ImaginaryAddedRatio')) stats.dmgBoost.Imaginary = (stats.dmgBoost.Imaginary || 0) + value;
  }
  
  // Format stat value for display
  static formatStat(value, isPercent = false) {
    if (isPercent) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return Math.round(value).toLocaleString();
  }
  
  // Get relic icon URL
  static getRelicIconURL(tid, type) {
    if (!tid) return '';
    
    // Enka Network relic icons
    const urls = [
      `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/IconRelic/${tid}.png`,
      `https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/${tid}.png`
    ];
    
    return urls[0]; // Return primary URL
  }
}

// Export for use
window.CharacterDetailsHelper = CharacterDetailsHelper;
