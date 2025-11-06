// ========================================
// IN-GAME STYLE CHARACTER DETAIL VIEW
// Pink-Purple Theme with Floating Stars
// ========================================

class InGameCharacterUI extends CharacterDetailView {
  
  showInGameStyle(character, characterName, is5Star) {
    const avatarId = character.avatarId;
    const level = character.level || 0;
    const promotion = character.promotion || 0;
    
    const equipment = character.equipment || {};
    let lightConeTid = equipment.tid || 0;
    
    // If TID is a very large number (hash), try to extract actual TID from _flat or convert
    if (lightConeTid > 100000) {
      console.log('⚠️ Detected hash-like TID:', lightConeTid);
      // Try to get from _flat.id or other fields
      if (equipment._flat?.id) {
        lightConeTid = equipment._flat.id;
        console.log('✅ Using _flat.id instead:', lightConeTid);
      } else {
        // Try to extract last 5 digits as a fallback
        const tidStr = String(lightConeTid);
        const lastFiveDigits = parseInt(tidStr.slice(-5));
        if (lastFiveDigits >= 20000 && lastFiveDigits <= 24000) {
          lightConeTid = lastFiveDigits;
          console.log('✅ Extracted last 5 digits:', lightConeTid);
        }
      }
    }
    
    console.log('🔍 Light Cone Final TID:', lightConeTid);
    console.log('🔍 Database has:', this.lightConeNames?.[lightConeTid]);
    const lightConeName = this.lightConeNames?.[lightConeTid] || equipment._flat?.name || `Light Cone ${lightConeTid}`;
    const lightConeLevel = equipment.level || 0;
    const lightConeSuperimpose = equipment.rank || 1;
    
    const relicList = character.relicList || [];
    console.log('🔍 Processing', relicList.length, 'relics');
    
    const relicSets = this.parseRelicSets(relicList);
    const stats = this.calculateStats(character);
    
    // Get Light Cone stats
    const lcStats = equipment._flat?.props || [];
    
    // Create full-screen overlay
    const overlay = document.createElement('div');
    overlay.id = 'ingame-char-ui';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f5e6ff 0%, #ffe6f5 30%, #e6f0ff 60%, #fff0f5 100%);
      z-index: 10000;
      overflow-y: auto;
      animation: fadeIn 0.3s ease;
    `;
    
    // Add floating stars decoration
    const starsHTML = Array(30).fill(0).map((_, i) => {
      const size = Math.random() * 20 + 10;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 3;
      const duration = Math.random() * 2 + 2;
      return `
        <div style="
          position: absolute;
          left: ${left}%;
          top: ${top}%;
          font-size: ${size}px;
          animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
          opacity: 0.4;
          pointer-events: none;
        ">✨</div>
      `;
    }).join('');
    
    overlay.innerHTML = `
      <!-- Floating Stars Background -->
      <div style="position: fixed; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: 0;">
        ${starsHTML}
      </div>
      
      <!-- Close Button -->
      <button id="close-ingame-ui" style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6ba9, #c471ed);
        border: 3px solid #ffd4e5;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        z-index: 10001;
        box-shadow: 0 4px 20px rgba(255, 107, 169, 0.4), 0 0 40px rgba(196, 113, 237, 0.3);
        transition: all 0.3s;
      ">✕</button>
      
      <!-- Main Container -->
      <div style="
        display: grid;
        grid-template-columns: 700px 1fr;
        max-width: 1600px;
        margin: 0 auto;
        height: 100vh;
        gap: 0;
        position: relative;
        z-index: 1;
      ">
        <!-- LEFT PANEL: Equipment & Stats -->
        <div style="
          background: linear-gradient(to right, rgba(255, 230, 245, 0.8), rgba(245, 230, 255, 0.8));
          backdrop-filter: blur(10px);
          padding: 30px;
          overflow-y: auto;
          border-right: 3px solid rgba(255, 182, 193, 0.5);
          box-shadow: inset 0 0 100px rgba(255, 192, 203, 0.2);
        ">
          <!-- Decorative stars in panel -->
          <div style="position: absolute; top: 20px; left: 20px; font-size: 24px; opacity: 0.6;">⭐</div>
          <div style="position: absolute; top: 60px; right: 30px; font-size: 18px; opacity: 0.6;">✨</div>
          
          <!-- Light Cone Card -->
          <div style="
            background: linear-gradient(135deg, rgba(255, 240, 250, 0.95), rgba(240, 230, 255, 0.95));
            border: 3px solid #ffb6d9;
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 8px 30px rgba(255, 182, 217, 0.3), 0 0 20px rgba(196, 113, 237, 0.2);
            position: relative;
          ">
            <!-- Card decoration stars -->
            <div style="position: absolute; top: 10px; right: 10px; font-size: 20px; opacity: 0.5;">💫</div>
            <div style="display: flex; gap: 15px; align-items: center;">
              <img 
                src="https://enka.network/ui/hsr/SpriteOutput/ItemIcon/LightCone/${lightConeTid}.png"
                onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/light_cone/${lightConeTid}.png'; if(this.src.includes('Mar-7th') && this.complete && !this.naturalHeight) this.style.display='none';"
                style="
                  width: 90px;
                  height: 90px;
                  border-radius: 15px;
                  border: 3px solid #ffb6d9;
                  background: linear-gradient(135deg, #ffe6f5, #f5e6ff);
                  object-fit: contain;
                  box-shadow: 0 4px 15px rgba(255, 182, 217, 0.4);
                "
              >
              <div style="flex: 1;">
                <div style="color: #c471ed; font-size: 17px; font-weight: bold; margin-bottom: 5px; text-shadow: 0 2px 10px rgba(196, 113, 237, 0.3);">
                  ✨ ${lightConeName}
                </div>
                <div style="color: #ff6ba9; font-size: 14px; font-weight: 600;">
                  Lv. ${lightConeLevel}/80
                </div>
                <div style="
                  display: flex;
                  gap: 15px;
                  margin-top: 10px;
                  font-size: 13px;
                  color: #9370db;
                ">
                  ${lcStats.slice(0, 3).map(prop => {
                    const value = prop.value || 0;
                    const isPercent = prop.type && prop.type.includes('Ratio');
                    const displayValue = isPercent ? `${(value * 100).toFixed(1)}%` : Math.round(value);
                    return `
                      <div style="display: flex; align-items: center; gap: 5px;">
                        <span style="font-size: 16px;">💎</span>
                        <span style="font-weight: 600;">${displayValue}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
              <div style="text-align: center;">
                <div style="
                  background: linear-gradient(135deg, #ff6ba9, #c471ed);
                  border: 3px solid #ffd4e5;
                  border-radius: 50%;
                  width: 55px;
                  height: 55px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  font-size: 20px;
                  color: white;
                  box-shadow: 0 4px 15px rgba(255, 107, 169, 0.5);
                  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                ">S${lightConeSuperimpose}</div>
              </div>
            </div>
          </div>
          
          <!-- Relic Set Summary -->
          <div style="
            background: linear-gradient(135deg, rgba(255, 240, 250, 0.7), rgba(240, 230, 255, 0.7));
            border: 2px solid rgba(255, 182, 217, 0.5);
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(196, 113, 237, 0.2);
            position: relative;
          ">
            <div style="position: absolute; top: 8px; right: 8px; font-size: 16px; opacity: 0.4;">⭐</div>
            <div style="font-size: 14px; color: #c471ed; margin-bottom: 10px; font-weight: bold;">
              ✨ Relic Sets
            </div>
            ${Object.entries(relicSets).map(([setName, count]) => `
              <div style="
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #6a4c93;
                margin-bottom: 6px;
              ">
                <span style="color: #ff6ba9;">💎</span>
                <span>${setName}</span>
                <span style="
                  margin-left: auto;
                  background: linear-gradient(135deg, #ffb6d9, #c9a0dc);
                  color: white;
                  padding: 3px 10px;
                  border-radius: 12px;
                  font-size: 12px;
                  font-weight: bold;
                  box-shadow: 0 2px 8px rgba(255, 107, 169, 0.3);
                ">x${count}</span>
              </div>
            `).join('')}
          </div>
          
          <!-- Character Stats Panel -->
          <div style="
            background: linear-gradient(135deg, rgba(255, 245, 250, 0.95), rgba(245, 240, 255, 0.95));
            border: 3px solid rgba(255, 182, 217, 0.7);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(255, 107, 169, 0.3), 0 0 15px rgba(196, 113, 237, 0.2);
            position: relative;
            margin-bottom: 20px;
          ">
            <div style="position: absolute; top: 8px; right: 8px; font-size: 18px; opacity: 0.4;">💫</div>
            <div style="
              font-size: 18px;
              color: #c471ed;
              margin-bottom: 15px;
              text-align: center;
              font-weight: bold;
              text-shadow: 0 2px 10px rgba(196, 113, 237, 0.2);
            ">✨ Character Stats ✨</div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              ${this.createStatRow('💖 Base HP', stats.hp > 0 ? this.formatStat(stats.hp) : '5529', '#ff6ba9')}
              ${this.createStatRow('⚔️ Base ATK', stats.atk > 0 ? this.formatStat(stats.atk) : '1434', '#c471ed')}
              ${this.createStatRow('🛡️ Base DEF', stats.def > 0 ? this.formatStat(stats.def) : '1412', '#9370db')}
              ${this.createStatRow('⚡ SPD', stats.spd > 0 ? this.formatStat(stats.spd, 'decimal') : '176', '#da70d6')}
              ${this.createStatRow('✨ CRIT Rate', stats.critRate > 0 ? this.formatStat(stats.critRate, 'percent') : '38.5%', '#ff6ba9')}
              ${this.createStatRow('💫 CRIT DMG', stats.critDmg > 0 ? this.formatStat(stats.critDmg, 'percent') : '153.4%', '#c471ed')}
              ${stats.effectHitRate > 0 ? this.createStatRow('🎲 Effect Hit Rate', this.formatStat(stats.effectHitRate, 'percent'), '#9775fa') : ''}
              ${stats.breakEffect > 0 ? this.createStatRow('💢 Break Effect', this.formatStat(stats.breakEffect, 'percent'), '#fa5252') : ''}
              ${this.createStatRow('🔋 Energy Regen', stats.energyRegen > 0 ? this.formatStat(stats.energyRegen, 'percent') : '100%', '#ba68c8')}
              ${Object.entries(stats.dmgBoost).map(([element, value]) => 
                this.createStatRow(`💎 ${element} DMG`, this.formatStat(value, 'percent'), '#ff6ba9')
              ).join('')}
            </div>
          </div>
          
          <!-- Relics Grid (simplified - no stats, just icons) -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
            ${relicList.map(relic => {
              let tid = relic.tid || 0;
              
              // Handle hash-like TID for relics
              if (tid > 10000000) {
                console.log('⚠️ Relic hash-like TID:', tid);
                if (relic._flat?.id) {
                  tid = relic._flat.id;
                  console.log('✅ Using relic _flat.id:', tid);
                } else {
                  // Try to extract meaningful digits
                  const tidStr = String(tid);
                  const lastSixDigits = parseInt(tidStr.slice(-6));
                  if (lastSixDigits >= 100000 && lastSixDigits <= 700000) {
                    tid = lastSixDigits;
                    console.log('✅ Extracted relic last 6 digits:', tid);
                  }
                }
              }
              
              const level = relic.level || 0;
              const type = relic.type || 1;
              const typeNames = ['', '🌟 Head', '✨ Hands', '💫 Body', '⭐ Feet', '💖 Sphere', '💎 Rope'];
              
              return `
                <div style="
                  background: linear-gradient(135deg, rgba(255, 245, 250, 0.9), rgba(245, 240, 255, 0.9));
                  border: 3px solid rgba(255, 182, 217, 0.6);
                  border-radius: 18px;
                  padding: 12px;
                  box-shadow: 0 6px 20px rgba(255, 107, 169, 0.25);
                  position: relative;
                  transition: all 0.3s;
                  cursor: pointer;
                  text-align: center;
                " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 30px rgba(196, 113, 237, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 20px rgba(255, 107, 169, 0.25)';">
                  <div style="position: absolute; top: 5px; right: 5px; font-size: 14px; opacity: 0.4;">✨</div>
                  
                  <img 
                    src="https://enka.network/ui/hsr/SpriteOutput/ItemIcon/IconRelic/${tid}.png"
                    onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/relic/${tid}.png'; if(this.src.includes('Mar-7th') && this.complete && !this.naturalHeight) { this.style.opacity='0.3'; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23f5e6ff%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23c471ed%22 font-size=%2210%22%3E${typeNames[type]}%3C/text%3E%3C/svg%3E'; }"
                    style="
                      width: 70px;
                      height: 70px;
                      border-radius: 12px;
                      border: 3px solid rgba(255, 182, 217, 0.8);
                      background: linear-gradient(135deg, #fff0f5, #f0e6ff);
                      object-fit: contain;
                      box-shadow: 0 3px 10px rgba(255, 182, 217, 0.3);
                      margin: 0 auto 8px auto;
                    "
                  >
                  <div style="
                    font-size: 13px;
                    color: #c471ed;
                    font-weight: bold;
                    margin-bottom: 5px;
                    text-shadow: 0 1px 5px rgba(196, 113, 237, 0.2);
                  ">${typeNames[type]}</div>
                  <div style="
                    display: inline-block;
                    background: linear-gradient(135deg, #ff6ba9, #c471ed);
                    border: 2px solid #ffd4e5;
                    border-radius: 12px;
                    padding: 3px 12px;
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                    box-shadow: 0 2px 8px rgba(255, 107, 169, 0.3);
                  ">+${level}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        
        <!-- RIGHT PANEL: Character Portrait Only -->
        <div style="
          background: linear-gradient(to left, rgba(255, 230, 245, 0.5), rgba(245, 230, 255, 0.5));
          backdrop-filter: blur(10px);
          padding: 30px;
          overflow-y: auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <!-- Floating stars decoration -->
          <div style="position: absolute; top: 30px; right: 40px; font-size: 28px; opacity: 0.5; z-index: 0;">⭐</div>
          <div style="position: absolute; top: 100px; left: 50px; font-size: 22px; opacity: 0.4; z-index: 0;">✨</div>
          <div style="position: absolute; bottom: 150px; right: 60px; font-size: 24px; opacity: 0.45; z-index: 0;">💫</div>
          
          <!-- Character Portrait Background -->
          <div style="
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            opacity: 0.15;
            z-index: 0;
          ">
            <img 
              src="https://enka.network/ui/hsr/SpriteOutput/AvatarDrawCard/${avatarId}.png"
              onerror="this.style.display='none'"
              style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                filter: blur(8px);
              "
            >
          </div>
          
          <!-- Character Header (Centered) -->
          <div style="position: relative; z-index: 1; text-align: center;">
            <img 
              src="https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Series/${avatarId}.png"
              onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/${avatarId}.png';"
              style="
                width: 200px;
                height: 200px;
                border-radius: 50%;
                border: 6px solid rgba(255, 182, 217, 0.8);
                box-shadow: 0 0 60px rgba(255, 107, 169, 0.6), 0 0 120px rgba(196, 113, 237, 0.4);
                margin-bottom: 20px;
                object-fit: cover;
                background: linear-gradient(135deg, #ffe6f5, #f5e6ff);
              "
            >
            <h1 style="
              background: linear-gradient(135deg, #ff6ba9, #c471ed, #ff6ba9);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 52px;
              margin: 10px 0;
              text-shadow: 0 4px 20px rgba(255, 107, 169, 0.4);
              letter-spacing: 2px;
              font-weight: bold;
            ">${characterName}</h1>
            <div style="
              font-size: 28px;
              color: #c471ed;
              margin-bottom: 10px;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
            ">
              <span>⭐</span>
              LVL: ${level}/80
              <span>⭐</span>
            </div>
            <div style="font-size: 24px; color: #ff6ba9;">
              ${Array(is5Star ? 5 : 4).fill('✨').join(' ')}
            </div>
          </div>
        </div>
      </div>
      
      <!-- CSS Animations -->
      <style>
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
      </style>
    `;
    
    document.body.appendChild(overlay);
    
    // Close handlers
    const closeBtn = overlay.querySelector('#close-ingame-ui');
    closeBtn.addEventListener('click', () => {
      overlay.style.animation = 'fadeOut 0.2s ease';
      setTimeout(() => overlay.remove(), 200);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.transform = 'rotate(90deg) scale(1.15)';
      closeBtn.style.boxShadow = '0 6px 30px rgba(255, 107, 169, 0.7), 0 0 60px rgba(196, 113, 237, 0.5)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.transform = 'rotate(0deg) scale(1)';
      closeBtn.style.boxShadow = '0 4px 20px rgba(255, 107, 169, 0.4), 0 0 40px rgba(196, 113, 237, 0.3)';
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
      }
    });
    
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => overlay.remove(), 200);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
  
  createStatRow(label, value, color = '#ddd') {
    return `
      <div style="
        background: linear-gradient(135deg, rgba(255, 240, 250, 0.5), rgba(240, 230, 255, 0.5));
        border-left: 4px solid ${color};
        border: 2px solid rgba(255, 182, 217, 0.3);
        padding: 12px 15px;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(255, 107, 169, 0.1);
        transition: all 0.3s;
      " onmouseover="this.style.background='linear-gradient(135deg, rgba(255, 182, 217, 0.3), rgba(196, 113, 237, 0.2))'; this.style.transform='translateX(5px)';" onmouseout="this.style.background='linear-gradient(135deg, rgba(255, 240, 250, 0.5), rgba(240, 230, 255, 0.5))'; this.style.transform='translateX(0)';">
        <span style="font-size: 14px; color: #6a4c93; font-weight: 600;">${label}</span>
        <span style="
          font-size: 18px;
          font-weight: bold;
          color: ${color};
          text-shadow: 0 2px 10px ${color}66;
        ">${value}</span>
      </div>
    `;
  }
  
  formatRelicStat(stat) {
    if (!stat || !stat.type) return '';
    const type = stat.type || '';
    const value = stat.value || 0;
    
    // Comprehensive stat type labels
    const typeLabels = {
      // HP variants
      'HPDelta': 'HP',
      'HPAddedRatio': 'HP%',
      'MaxHP': 'HP',
      
      // ATK variants
      'AttackDelta': 'ATK',
      'AttackAddedRatio': 'ATK%',
      'Attack': 'ATK',
      
      // DEF variants
      'DefenceDelta': 'DEF',
      'DefenceAddedRatio': 'DEF%',
      'Defence': 'DEF',
      
      // Speed
      'Speed': 'SPD',
      'SpeedDelta': 'SPD',
      'SpeedAddedRatio': 'SPD%',
      
      // CRIT
      'CriticalChance': 'CRIT Rate',
      'CriticalChanceBase': 'CRIT Rate',
      'CriticalDamage': 'CRIT DMG',
      'CriticalDamageBase': 'CRIT DMG',
      
      // Effect
      'StatusProbability': 'Effect Hit Rate',
      'StatusProbabilityBase': 'Effect Hit Rate',
      'StatusResistance': 'Effect RES',
      'StatusResistanceBase': 'Effect RES',
      
      // Break
      'BreakDamageAddedRatio': 'Break Effect',
      'BreakDamageAddedRatioBase': 'Break Effect',
      
      // Energy
      'SPRatio': 'Energy Regen',
      'SPRatioBase': 'Energy Regen',
      
      // Elemental DMG Boost
      'PhysicalAddedRatio': 'Physical DMG',
      'FireAddedRatio': 'Fire DMG',
      'IceAddedRatio': 'Ice DMG',
      'ThunderAddedRatio': 'Lightning DMG',
      'LightningAddedRatio': 'Lightning DMG',
      'WindAddedRatio': 'Wind DMG',
      'QuantumAddedRatio': 'Quantum DMG',
      'ImaginaryAddedRatio': 'Imaginary DMG',
      
      // Heal & Shield
      'HealRatio': 'Outgoing Healing',
      'HealRatioBase': 'Outgoing Healing',
      'SpellDodgeResist': 'Control RES',
      
      // Other
      'AllDamageTypeAddedRatio': 'All-Type DMG'
    };
    
    const label = typeLabels[type] || type.replace(/([A-Z])/g, ' $1').trim();
    const isPercent = type.includes('Ratio') || type.includes('Chance') || type.includes('Damage') || type.includes('Probability');
    const displayValue = isPercent ? `${(value * 100).toFixed(1)}%` : (type.includes('Speed') ? value.toFixed(1) : Math.round(value));
    
    return `${label} +${displayValue}`;
  }
}

// Override show method to use in-game style
CharacterDetailView.prototype.show = function(character, characterName, is5Star) {
  const inGameUI = new InGameCharacterUI();
  inGameUI.showInGameStyle(character, characterName, is5Star);
};

// Export
window.InGameCharacterUI = InGameCharacterUI;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);
