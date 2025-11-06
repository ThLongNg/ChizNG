// Character Popup Handler for Honkai Star Rail
class CharacterPopup {
  constructor() {
    this.characterData = [];
    this.characterNames = {
      // 5-Star Characters
      1001: 'March 7th',
      1002: 'Dan Heng',
      1003: 'Himeko',
      1004: 'Welt',
      1005: 'Kafka',
      1006: 'Silver Wolf',
      1008: 'Arlan',
      1009: 'Asta',
      1013: 'Herta',
      1101: 'Bronya',
      1102: 'Seele',
      1103: 'Pela',
      1104: 'Gepard',
      1105: 'Natasha',
      1106: 'Sushang',
      1107: 'Clara',
      1108: 'Sampo',
      1109: 'Hook',
      1110: 'Lynx',
      1111: 'Luka',
      1112: 'Topaz & Numby',
      1201: 'Qingque',
      1202: 'Tingyun',
      1203: 'Luocha',
      1204: 'Jing Yuan',
      1205: 'Blade',
      1206: 'Sushang',
      1207: 'Yukong',
      1208: 'Fu Xuan',
      1209: 'Yanqing',
      1210: 'Guinaifen',
      1211: 'Bailu',
      1212: 'Jingliu',
      1213: 'Dan Heng • Imbibitor Lunae',
      1214: 'Xueyi',
      1215: 'Hanya',
      1217: 'Huohuo',
      1218: 'Jiaoqiu',
      1220: 'Feixiao',
      1221: 'Yunli',
      1222: 'Lingsha',
      1223: 'Moze',
      1224: 'March 7th (Hunt)',
      1301: 'Gallagher',
      1302: 'Argenti',
      1303: 'Ruan Mei',
      1304: 'Aventurine',
      1305: 'Dr. Ratio',
      1306: 'Sparkle',
      1307: 'Black Swan',
      1308: 'Acheron',
      1309: 'Robin',
      1310: 'Firefly',
      1312: 'Misha',
      1314: 'Jade',
      1315: 'Boothill',
      // Version 3.0+ Characters (Amphoreus) - CORRECT MAPPING
      1402: 'Aglaea',
      1407: 'Castorice',
      1408: 'Phainon',
      1409: 'Hyacine',
      1410: 'Hysilens',
      1412: 'Cerydra',
      1415: 'Cyrene',
      // Trailblazer variants
      8001: 'Trailblazer (Physical)',
      8002: 'Trailblazer (Physical)',
      8003: 'Trailblazer (Fire)',
      8004: 'Trailblazer (Fire)',
      8005: 'Trailblazer (Imaginary)',
      8006: 'Trailblazer (Imaginary)'
    };
  }

  setCharacterData(data) {
    this.characterData = data || [];
  }

  show() {
    if (!this.characterData || this.characterData.length === 0) {
      alert('No character data available');
      return;
    }

    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'character-popup-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #f5e6ff 0%, #ffe6f5 30%, #e6f0ff 60%, #fff0f5 100%);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
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
          position: fixed;
          left: ${left}%;
          top: ${top}%;
          font-size: ${size}px;
          animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
          opacity: 0.4;
          pointer-events: none;
          z-index: 0;
        ">✨</div>
      `;
    }).join('');

    // Create popup container
    const popup = document.createElement('div');
    popup.style.cssText = `
      background: linear-gradient(135deg, rgba(255, 245, 250, 0.95), rgba(245, 240, 255, 0.95));
      backdrop-filter: blur(20px);
      border-radius: 25px;
      max-width: 1400px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 35px;
      box-shadow: 0 20px 60px rgba(255, 107, 169, 0.4), 0 0 100px rgba(196, 113, 237, 0.3);
      border: 3px solid rgba(255, 182, 217, 0.6);
      animation: slideIn 0.3s ease;
      position: relative;
      z-index: 1;
    `;

    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 3px solid rgba(255, 182, 217, 0.5);
      padding-bottom: 20px;
    `;
    
    header.innerHTML = `
      <div>
        <h2 style="
          background: linear-gradient(135deg, #ff6ba9, #c471ed, #ff6ba9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 36px;
          margin: 0 0 8px 0;
          font-weight: bold;
          text-shadow: 0 4px 20px rgba(255, 107, 169, 0.3);
          letter-spacing: 2px;
        ">✨ Character Showcase ✨</h2>
        <p style="color: #c471ed; margin: 0; font-size: 16px; font-weight: 600;">
          💫 Total Characters: ${this.characterData.length}
        </p>
      </div>
      <button id="close-popup-btn" style="
        background: linear-gradient(135deg, #ff6ba9, #c471ed);
        border: 3px solid #ffd4e5;
        color: white;
        font-size: 26px;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 4px 20px rgba(255, 107, 169, 0.5), 0 0 40px rgba(196, 113, 237, 0.3);
        font-weight: bold;
      ">✕</button>
    `;

    // Create character grid
    const grid = document.createElement('div');
    grid.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    `;

    // Sort characters by level (highest first)
    const sortedCharacters = [...this.characterData].sort((a, b) => (b.level || 0) - (a.level || 0));

    // Add characters to grid
    sortedCharacters.forEach(character => {
      const charCard = this.createCharacterCard(character);
      grid.appendChild(charCard);
    });

    // Add animations CSS
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { 
          opacity: 0;
          transform: translateY(-30px) scale(0.95);
        }
        to { 
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.3); }
      }
      #character-popup-overlay::-webkit-scrollbar {
        width: 12px;
      }
      #character-popup-overlay::-webkit-scrollbar-track {
        background: rgba(255, 182, 217, 0.2);
        border-radius: 10px;
      }
      #character-popup-overlay::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #ff6ba9, #c471ed);
        border-radius: 10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
      }
      #character-popup-overlay::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #ff8fab, #da70d6);
      }
      #close-popup-btn:hover {
        transform: rotate(90deg) scale(1.15);
        background: linear-gradient(135deg, #ff8fab, #da70d6);
        box-shadow: 0 6px 30px rgba(255, 107, 169, 0.7), 0 0 60px rgba(196, 113, 237, 0.5);
      }
    `;
    document.head.appendChild(style);

    overlay.innerHTML = starsHTML;
    overlay.appendChild(popup);
    popup.appendChild(header);
    popup.appendChild(grid);
    document.body.appendChild(overlay);

    // Close popup handlers
    const closeBtn = document.getElementById('close-popup-btn');
    closeBtn.addEventListener('click', () => {
      overlay.style.animation = 'fadeIn 0.2s ease reverse';
      setTimeout(() => overlay.remove(), 200);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => overlay.remove(), 200);
      }
    });

    // ESC key to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        overlay.style.animation = 'fadeIn 0.2s ease reverse';
        setTimeout(() => overlay.remove(), 200);
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }

  createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    
    const avatarId = character.avatarId;
    const level = character.level || 0;
    const promotion = character.promotion || 0;
    const eidolonCount = character.rank || 0;
    
    // Determine rarity (5-star or 4-star)
    const is5Star = !avatarId.toString().startsWith('1') || [1003, 1004, 1005, 1006, 1101, 1102, 1104, 1107, 1203, 1204, 1205, 1208, 1209, 1211, 1212, 1213, 1217, 1302, 1303, 1304, 1306, 1307, 1308, 1309, 1310, 1314, 1315, 1402, 1407, 1408, 1409, 1410, 1412, 1415].includes(avatarId);
    
    const rarityGradient = is5Star 
      ? 'linear-gradient(135deg, #ff6ba9, #c471ed)'
      : 'linear-gradient(135deg, #da70d6, #ba68c8)';

    card.style.cssText = `
      background: linear-gradient(135deg, rgba(255, 245, 250, 0.9), rgba(245, 240, 255, 0.9));
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 18px;
      border: 3px solid rgba(255, 182, 217, 0.5);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(255, 107, 169, 0.2);
    `;

    card.innerHTML = `
      <div style="position: relative;">
        <!-- Decorative star -->
        <div style="position: absolute; top: 8px; right: 8px; font-size: 20px; opacity: 0.4; z-index: 1;">✨</div>
        
        <!-- Character Avatar -->
        <div style="
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: ${rarityGradient};
          padding: 5px;
          margin-bottom: 15px;
          box-shadow: 0 8px 25px rgba(255, 107, 169, 0.4), 0 0 40px rgba(196, 113, 237, 0.3);
        ">
          <img 
            src="https://enka.network/ui/hsr/SpriteOutput/AvatarRoundIcon/Series/${avatarId}.png"
            onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/${avatarId}.png';"
            style="
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
              background: linear-gradient(135deg, #ffe6f5, #f5e6ff);
            "
            alt="${this.getCharacterName(avatarId)}"
          >
        </div>
        
        <!-- Level Badge -->
        <div style="
          position: absolute;
          bottom: 18px;
          right: 8px;
          background: linear-gradient(135deg, #ff6ba9, #c471ed);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          border: 3px solid #ffd4e5;
          box-shadow: 0 4px 15px rgba(255, 107, 169, 0.5);
          z-index: 2;
        ">Lv.${level}</div>

        <!-- Rarity Stars -->
        <div style="
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          gap: 3px;
          z-index: 2;
        ">
          ${Array(is5Star ? 5 : 4).fill(0).map(() => `
            <span style="color: #ff6ba9; font-size: 16px; text-shadow: 0 0 10px rgba(255, 107, 169, 0.8), 0 2px 5px rgba(196, 113, 237, 0.5);">✨</span>
          `).join('')}
        </div>
      </div>
      
      <!-- Character Info -->
      <div style="text-align: center;">
        <div style="
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #ff6ba9, #c471ed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(255, 107, 169, 0.3);
          letter-spacing: 0.5px;
        ">
          ${this.getCharacterName(avatarId)}
        </div>
        
        <div style="
          font-size: 13px;
          color: #c471ed;
          margin-bottom: 12px;
          font-weight: 600;
        ">
          ⭐ Ascension ${promotion}/6
        </div>
        
        <!-- Eidolon Display -->
        <div style="
          display: flex;
          justify-content: center;
          gap: 5px;
          margin-top: 10px;
        ">
          ${Array(6).fill(0).map((_, i) => `
            <div style="
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: ${i < eidolonCount ? 'linear-gradient(135deg, #ff6ba9, #c471ed)' : 'rgba(218, 112, 214, 0.2)'};
              border: 2px solid ${i < eidolonCount ? '#ffd4e5' : 'rgba(186, 104, 200, 0.4)'};
              box-shadow: ${i < eidolonCount ? '0 0 12px rgba(255, 107, 169, 0.7), 0 0 20px rgba(196, 113, 237, 0.4)' : 'none'};
              transition: all 0.3s;
            "></div>
          `).join('')}
        </div>
        
        <div style="
          font-size: 12px;
          color: #9370db;
          margin-top: 8px;
          font-weight: 600;
        ">
          💫 E${eidolonCount}
        </div>
      </div>
    `;

    // Hover effects
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.03)';
      card.style.borderColor = 'rgba(255, 107, 169, 0.8)';
      card.style.boxShadow = '0 15px 40px rgba(255, 107, 169, 0.5), 0 0 60px rgba(196, 113, 237, 0.4)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.borderColor = 'rgba(255, 182, 217, 0.5)';
      card.style.boxShadow = '0 8px 25px rgba(255, 107, 169, 0.2)';
    });

    // Click handler (for future detailed view)
    card.addEventListener('click', () => {
      this.showCharacterDetails(character);
    });

    return card;
  }

  getCharacterName(avatarId) {
    return this.characterNames[avatarId] || `Character ${avatarId}`;
  }

  showCharacterDetails(character) {
    // Use the new CharacterDetailView for full details
    if (window.CharacterDetailView) {
      const detailView = new window.CharacterDetailView();
      const name = this.getCharacterName(character.avatarId);
      const avatarId = character.avatarId;
      
      // Determine rarity (5-star or 4-star)
      const is5Star = !avatarId.toString().startsWith('1') || 
        [1003, 1004, 1005, 1006, 1101, 1102, 1104, 1107, 1203, 1204, 1205, 
         1208, 1209, 1211, 1212, 1213, 1217, 1302, 1303, 1304, 1306, 1307, 
         1308, 1309, 1310, 1314, 1315, 1407, 1408, 1409, 1415].includes(avatarId);
      
      detailView.show(character, name, is5Star);
    } else {
      console.error('❌ CharacterDetailView not loaded');
      alert('Character detail view is not available. Please refresh the page.');
    }
  }
}

// Export for use in main script
window.CharacterPopup = CharacterPopup;
