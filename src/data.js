/* BARO: original weapon designs and tuned gameplay parameters. */
'use strict';
window.BARO = {};
BARO.WEAPONS = [
 {name:'EMBER',jp:'エンバー',class:'ASSAULT RIFLE',kind:'rifle',damage:30,rate:9.5,mag:30,reload:1.9,spread:.013,recoil:.018,color:0xffb35a,skin:0x394950,effect:'fire',desc:'信頼できる主力ライフル。炎の尾を引く曳光弾と、火花が散るマズルブレーキ。',trait:'焼夷弾 / ヘッドショット ×2.2'},
 {name:'TIDAL',jp:'タイダル',class:'ASSAULT RIFLE',kind:'rifle',damage:25,rate:11.5,mag:36,reload:1.8,spread:.01,recoil:.012,color:0x81e3dd,skin:0x326574,effect:'water',desc:'海水冷却機構を備えた高精度ライフル。着弾のたび、水色の衝撃環が広がる。',trait:'低反動 / 水流リング'},
 {name:'VIPER',jp:'ヴァイパー',class:'BURST RIFLE',kind:'rifle',damage:29,rate:3.2,burst:3,mag:27,reload:1.8,spread:.009,recoil:.012,color:0xa5e479,skin:0x415542,effect:'toxic',desc:'3発を一瞬で撃ち込むバーストライフル。鮮緑の破片と蛇行するエネルギー痕。',trait:'3点バースト / 高い瞬間火力'},
 {name:'SPECTRAL',jp:'スペクトラル',class:'SUPPRESSED RIFLE',kind:'rifle',damage:27,rate:10,mag:32,reload:1.6,spread:.007,recoil:.009,color:0xc7b1f4,skin:0x38384d,effect:'void',desc:'消音器と浮遊する外装を持つ特殊ライフル。紫の残像を引いて静かに撃ち抜く。',trait:'サプレッサー / 精密射撃'},
 {name:'KITE',jp:'カイト',class:'SUBMACHINE GUN',kind:'smg',damage:19,rate:16,mag:40,reload:1.35,spread:.024,recoil:.012,color:0xffd879,skin:0x796849,effect:'spark',desc:'軽快に走り回るための小型SMG。金色の火花と高速の薬莢排出。',trait:'超高速連射 / 移動速度 +10%'},
 {name:'GLACIER',jp:'グレイシャー',class:'SUBMACHINE GUN',kind:'smg',damage:23,rate:12,mag:30,reload:1.5,spread:.017,recoil:.01,color:0xb7eaff,skin:0x768f9d,effect:'ice',slow:true,desc:'結晶化した冷却コアを搭載。青白い氷片で敵の動きを一時的に鈍らせる。',trait:'冷却弾 / 敵をスローダウン'},
 {name:'RATTLER',jp:'ラトラー',class:'MACHINE PISTOL',kind:'pistol',damage:17,rate:18,mag:24,reload:1.15,spread:.03,recoil:.015,color:0xff9579,skin:0x5e3d37,effect:'fire',desc:'片手サイズのフルオート。赤熱する銃身から、小刻みに炎が噴き出す。',trait:'18発/秒 / 最速リロード'},
 {name:'MONARCH',jp:'モナーク',class:'HEAVY PISTOL',kind:'pistol',damage:65,rate:3,mag:8,reload:1.5,spread:.006,recoil:.055,color:0xffdc88,skin:0xc2a66d,effect:'gold',desc:'重厚な金属外装と巨大なマズルフラッシュ。一発の価値を知る者のために。',trait:'大口径 / 金の衝撃波'},
 {name:'ORBIT',jp:'オービット',class:'ENERGY PISTOL',kind:'pistol',damage:40,rate:5,mag:16,reload:1.3,spread:.008,recoil:.024,color:0xc9c8ff,skin:0x64718b,effect:'orbit',desc:'弾倉の代わりに周回するエネルギーリング。空間を圧縮した光弾を放つ。',trait:'軌道リング / 安定した精度'},
 {name:'BREAKER',jp:'ブレイカー',class:'PUMP SHOTGUN',kind:'shotgun',damage:16,pellets:9,rate:1.15,mag:6,reload:2.4,spread:.09,recoil:.085,color:0xffb46d,skin:0x6e513e,effect:'fire',desc:'9発の散弾を扇状に発射。スライドするフォアエンドと重い発射音。',trait:'9ペレット / 至近距離特化'},
 {name:'BLOOM',jp:'ブルーム',class:'AUTO SHOTGUN',kind:'shotgun',damage:12,pellets:7,rate:3.4,mag:12,reload:2.2,spread:.105,recoil:.055,color:0xffa5c7,skin:0x814d63,effect:'petal',desc:'花びらのような光片が弾けるオートショットガン。接近戦を鮮やかに制する。',trait:'自動散弾 / 花弁エフェクト'},
 {name:'LONGVIEW',jp:'ロングビュー',class:'BOLT-ACTION SNIPER',kind:'sniper',damage:140,rate:.8,mag:5,reload:2.7,spread:.001,recoil:.09,color:0xffe4b9,skin:0x737064,effect:'gold',zoom:24,desc:'長いバレルと高倍率スコープ。遠くの敵を一本の黄金の弾道で射抜く。',trait:'高倍率スコープ / 一撃必殺'},
 {name:'THUNDER',jp:'サンダー',class:'RAIL SNIPER',kind:'sniper',damage:115,rate:1.1,mag:7,reload:2.4,spread:.002,recoil:.06,color:0xb7ceff,skin:0x445c84,effect:'electric',chain:true,zoom:30,desc:'導電レールから雷光を射出。近くの敵へ連鎖する電撃を発生させる。',trait:'連鎖電撃 / 最大3体に波及'},
 {name:'FALCON',jp:'ファルコン',class:'MARKSMAN RIFLE',kind:'sniper',damage:62,rate:3.5,mag:16,reload:1.9,spread:.004,recoil:.032,color:0xc9f4dc,skin:0x557a6d,effect:'wind',zoom:40,desc:'スコープ付きのセミオートライフル。薄い風の輪とともに連続精密射撃。',trait:'セミオート / 低倍率スコープ'},
 {name:'BASTION',jp:'バスティオン',class:'LIGHT MACHINE GUN',kind:'heavy',damage:27,rate:12,mag:100,reload:3.2,spread:.022,recoil:.025,color:0xffb75d,skin:0x5f6856,effect:'spark',desc:'ベルト給弾式の制圧火器。連続射撃で銃身が赤熱し、薬莢が雨のように落ちる。',trait:'100発ベルト / 継続制圧'},
 {name:'TEMPEST',jp:'テンペスト',class:'ROTARY CANNON',kind:'heavy',damage:18,rate:22,mag:150,reload:3.6,spread:.035,recoil:.013,color:0x9bded9,skin:0x446166,effect:'electric',desc:'6本の銃身が回転する大火力砲。激しい発射光と渦を巻く排熱で押し切る。',trait:'6連回転銃身 / 22発/秒'},
 {name:'SOLSTICE',jp:'ソルスティス',class:'PLASMA LAUNCHER',kind:'launcher',damage:85,rate:1.6,mag:8,reload:2.5,spread:.006,recoil:.045,color:0xffcb6e,skin:0x9c7144,effect:'plasma',projectile:30,splash:4,desc:'太陽のようなプラズマ球を投射。着弾すると大きな衝撃球となって爆ぜる。',trait:'プラズマ弾 / 半径4mの爆発'},
 {name:'SINGULARITY',jp:'シンギュラリティ',class:'GRAVITY LAUNCHER',kind:'launcher',damage:95,rate:.9,mag:5,reload:2.8,spread:.004,recoil:.05,color:0xc3a8f6,skin:0x4f4665,effect:'void',projectile:23,splash:5,desc:'重力球がゆっくりと飛び、敵を引き寄せて圧壊する。崩れる光の輪が空間を揺らす。',trait:'重力の渦 / 敵の引き寄せ'},
 {name:'COMET',jp:'コメット',class:'ROCKET LAUNCHER',kind:'launcher',damage:135,rate:.65,mag:3,reload:3,spread:.003,recoil:.1,color:0xff8c5c,skin:0x7f5146,effect:'rocket',projectile:42,splash:6,desc:'尾を引くロケットを射出。飛散する破片と複数の爆発リングで一帯を吹き飛ばす。',trait:'高威力ロケット / 半径6m爆風'},
 {name:'PRISM',jp:'プリズム',class:'PHOTON RIFLE',kind:'rifle',damage:45,rate:6.5,mag:24,reload:2,spread:.004,recoil:.023,color:0xf5eee1,skin:0xc4cccb,effect:'prism',desc:'分光結晶から虹色の光線を放つ。角張った白い装甲と7色の着弾片。',trait:'分光ビーム / 虹色の破片'}
];
BARO.TARGETS = {
 dummy:{name:'訓練ダミー',hp:100,score:100,color:0xeab97e},
 strafe:{name:'移動ダミー',hp:100,score:140,color:0x80c4b9},
 drone:{name:'浮遊ドローン',hp:75,score:170,color:0xe19776},
 armored:{name:'重装センチネル',hp:240,score:240,color:0xc2a67a},
 pop:{name:'ポップアップ',hp:70,score:130,color:0xc1addf},
 orb:{name:'精密オーブ',hp:35,score:200,color:0xc3ddf1},
 soldier:{name:'戦闘ユニット',hp:100,score:160,color:0xbc7770}
};
BARO.clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
BARO.rng=(seed=731)=>()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
BARO.weaponSVG = function(w){
 const c='#'+w.skin.toString(16).padStart(6,'0'),a='#'+w.color.toString(16).padStart(6,'0');
 let parts='';
 if(w.kind==='pistol')parts='<path d="M27 28h69v14H62l-4 23H40l3-25H27z" fill="'+c+'"/><path d="M36 31h53v5H36z" fill="'+a+'"/><path d="M89 30h25v10H89z" fill="#bac3bd"/>';
 else if(w.kind==='launcher')parts='<path d="M19 28h97v27H19z" fill="'+c+'"/><ellipse cx="116" cy="41" rx="7" ry="15" fill="'+a+'"/><path d="M45 54h12l-4 16H39zm29 0h11v10H71" fill="#59666b"/><path d="M11 24h17v35H11z" fill="#a2aaa0"/>';
 else parts='<path d="M12 36h23l13-10h59v23H79l-7 20H57l5-22H37L18 56H9z" fill="'+c+'"/><path d="M88 32h54v8H88zM33 29h55v5H33z" fill="#b0b6aa"/><path d="M48 29h41v5H48z" fill="'+a+'"/>'+(w.kind==='sniper'?'<path d="M59 12h35v11H59z" fill="#253845"/><path d="M53 11h10v14H53z" fill="'+a+'"/>':'')+(w.kind==='heavy'?'<path d="M53 46h28v24H53z" fill="#7a7e6c"/>':'');
 return '<svg viewBox="0 0 155 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="rotate(-8 77 40)">'+parts+'</g></svg>';
};
