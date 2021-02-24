import { MAID_SCENARIOS } from "./clouds/scenarios";
import { ABOUT_THIS_WORLD } from "./common/scenarios";
import { Area } from "~/types/exhibition";

const area: Area = {
  areas: {},
  background: {
    color: "#FFCFCB",
  },
  collider: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
    url: "/objects/areas/cloud/collider.glb",
  },
  fog: {
    color: "#FFCFCB",
  },
  lights: {
    directional: {
      color: "#FD4D56",
      position: {
        x: 0,
        y: 10,
        z: 0,
      },
    },
    points: [
      {
        color: "#FFF",
        position: {
          x: 0,
          y: 10,
          z: 0,
        },
      },
    ],
  },
  objects: {
    characters: [
      {
        id: "noneme_sitting",
        name: "",
        position: {
          x: 12.15,
          y: 5.825,
          z: 2.385,
        },
        rotation: {
          x: 0,
          y: -180,
          z: 0,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: [],
        url: "/objects/characters/noneme_sitting.glb",
      },
      {
        id: "flower_sheep",
        name: "",
        position: {
          x: -1.68,
          y: 6,
          z: 11.07,
        },
        rotation: {
          x: 0,
          y: 145,
          z: 0,
        },
        scale: {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        scenarios: [
          {
            branches: [
              {
                message: "行く",
                scenarios: [
                  {
                    actions: ["move_to_meadow"],
                    message: "…",
                  },
                ],
              },
              {
                message: "止めとく",
                scenarios: [
                  {
                    message: "…",
                  },
                ],
              },
            ],
            name: null,
            message: "どうやら草原に連れて行ってくれるようだ。",
          },
        ],
        url: "/objects/characters/flower_sheep.glb",
      },
      {
        id: "water_sheep",
        name: "",
        position: {
          x: -2.725,
          y: 6,
          z: 11.07,
        },
        rotation: {
          x: 0,
          y: 180,
          z: 0,
        },
        scale: {
          x: 0.2,
          y: 0.2,
          z: 0.2,
        },
        scenarios: [
          {
            branches: [
              {
                message: "行く",
                scenarios: [
                  {
                    actions: ["move_to_sea"],
                    message: "…",
                  },
                ],
              },
              {
                message: "止めとく",
                scenarios: [
                  {
                    message: "…",
                  },
                ],
              },
            ],
            name: null,
            message: "どうやら水中遺跡に連れて行ってくれるようだ。",
          },
        ],
        url: "/objects/characters/water_sheep.glb",
      },
      {
        id: "ameri",
        name: "あめり",
        position: {
          x: 15.05,
          y: 6.155,
          z: 2.56,
        },
        rotation: {
          x: -180,
          y: 18,
          z: -180,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: [],
        url: "/objects/characters/ameri.glb",
      },
      {
        id: "maid",
        name: "メイドさん",
        position: {
          x: 7.75,
          y: 5.79,
          z: 9.835,
        },
        rotation: {
          x: -180,
          y: -18,
          z: 180,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        scenarios: MAID_SCENARIOS,
        url: "/objects/characters/maid.glb",
      },
      {
        id: "hitugi",
        name: "棺",
        position: {
          x: -2.2,
          y: 6,
          z: 11.25,
        },
        rotation: {
          x: 0,
          y: -200,
          z: 0,
        },
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        scenarios: [
          {
            branches: [
              {
                message: "好きなお菓子のはなし",
                scenarios: [
                  {
                    message: "…私はグミが好き。",
                  },
                  {
                    message: "食感がグミグミしてて何だか気持ちいいから…。",
                  },
                ],
              },
              {
                message: "この世界について",
                scenarios: ABOUT_THIS_WORLD,
              },
            ],
            message: "………ここは甘いにおいがする。",
          },
        ],
        url: "/objects/characters/hitsugi.glb",
      },
    ],
    components: [],
    decorations: [
      {
        position: {
          x: -10.175,
          y: 6.75,
          z: -19.8,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/main_visual.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/balloons.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/candy.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/clouds.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/neminko_sleeping.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/pc.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/sweets.glb",
      },
      {
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/terrain.glb",
      },
    ],
    items: [
      {
        id: "fanarts",
        position: {
          x: 10.75,
          y: 5.5,
          z: 2.65,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/post.glb",
      },
    ],
    works: [
      {
        characters: ["okusuri"],
        comment: "",
        date: "2019/11",
        id: "okusuri",
        imageUrl: "/images/okusuri.png",
        position: {
          x: -8.9,
          y: 6.85,
          z: 1.85,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/okusuri.glb",
        title: "okusuri",
      },
      {
        characters: ["かるめりちゃん"],
        comment:
          "Calmeryさんのオリジナルキャラクター、かるめりちゃんを描く機会をいただいて描いた一枚です。\n\n授業中、プリントを後ろの席に回すときに見えた彼女の姿。\n\n学校のカーテンって薄黄色で光をほどよく通してくれて好きでした。\n窓際の席になると喜んでいましたが、風が強い日にはカーテンが暴れまくってカオスだった記憶があります。\n\nノートに落書きしている子を見ると何を落書きしてるんだろう…っていつも気になっちゃう。\n自分はノートではなく学校の机にシャーペンで落書きするのが好きでした。",
        date: "2019/11",
        id: "calmery_chan",
        imageUrl: "/images/calmery_chan.png",
        position: {
          x: 3.25,
          y: 6.85,
          z: -3.25,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/calmery_chan.glb",
        title: "春色のキミ",
      },
      {
        characters: ["あれ…？"],
        comment:
          "見た通りですね。\n何を思ってこの絵を描いたのかは思い出せません…。(汗\n卵とかが頭に乗っている女の子は可愛い！流行らせましょう！\n\n目玉焼きは黄身は半熟のままで白身パリパリになるまで焼くのが好きです。",
        date: "2016/11",
        id: "fried_egg",
        imageUrl: "/images/fried_egg.png",
        position: {
          x: 12.6,
          y: 6.87,
          z: 9.9,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/fried_egg.glb",
        title: "目玉焼き乗せガール",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n寝そべっているこいしちゃんです。\nサードアイのコードをどこに伸ばすかでいつもとても悩みます。\nとても楽しい時間です。",
        date: "2020/01",
        id: "koishi_lie",
        position: {
          x: -3.75,
          y: 6.85,
          z: 2,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/koishi.glb",
        imageUrl: "/images/koishi_lie.png",
        title: "こいしちゃん",
      },
      {
        characters: ["りぃちゃん", "まいちゃん"],
        comment:
          "りぃちゃん(→)「ねぇねぇ！写真撮ろ～！」\nまいちゃん(←)「えっ今…？？しょうがないなぁ…」\nうさぎの姉妹ちゃんです。\n右が姉で左が妹です。\nポーズや服装で仲良し感を、表情で関係性を感じてもらえたら嬉しいです。",
        date: "2020/04",
        id: "lee_mai",
        position: {
          x: 6.95,
          y: 6.9,
          z: -2.85,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/lee_mai.glb",
        imageUrl: "/images/lee_mai.png",
        title: "兎姉妹",
      },
      {
        characters: ["羽琉（はる）さん"],
        comment:
          "ロングスカートのメイドさんはいいぞ。\nでもあの服装って実際動きづらそうですよね…。\n沢山怪我して転んだりして、頑張り屋さんだけどちょっとカッコ悪いメイドさんもいいと思います。",
        date: "2019/08",
        id: "maid",
        position: {
          x: 1.7,
          y: 6.885,
          z: 9.75,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/maid.glb",
        imageUrl: "/images/maid.png",
        title: "ドジッ子メイドさん",
      },
      {
        characters: ["円華（まどか）さん"],
        comment:
          "ガスマスクを装着しているメイドさん。\n玉ねぎと包丁を持って…一体何バーグを作ってご主人様に振る舞うつもりなんだ…！？\n\n自分も玉ねぎのみじん切りに毎回泣かされてます、つらい…。",
        date: "2020/01",
        id: "maid_gas_mask",
        imageUrl: "/images/maid_gas_mask.png",
        position: {
          x: 9.2,
          y: 6.85,
          z: 9.35,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/maid_gas_mask.glb",
        title: "ガスマスクメイドさん",
      },
      {
        characters: ["羽琉（はる）さん"],
        comment:
          "美味しそうなパンケーキを目の前にして目を輝かさずにはいられないメイドさん。\n女の子はキラキラで可愛い食べ物に弱いのだ！！(たぶん！)\n無事倒さず運ぶことが出来るのか…！？\n\n食べ物を描くとキャラクターより描く時間がかかってしまいます…。\n食欲を犠牲にしながら描く食べ物は楽しいです。",
        date: "2020/05",
        id: "maid_pancake",
        imageUrl: "/images/maid_pancake.png",
        position: {
          x: -10.65,
          y: 6.87,
          z: 9.68,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/maid_pancake.glb",
        title: "キラキラふわふわパンケーキ",
      },
      {
        characters: ["ノネメちゃん"],
        comment: "",
        date: "2021/02",
        id: "moment",
        imageUrl: "/images/moment.png",
        position: {
          x: -0.615,
          y: 6.85,
          z: -3.13,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/moment.glb",
        title: "moment",
      },
      {
        characters: ["ねみん子ちゃん"],
        comment:
          "ひつじパジャマ姿のねみん子ちゃん。\nもこもこな服って可愛い…！！\n\nソシャゲのSRでよくあるキラキラカード感を表現したかったのですが、なかなか難しいですね…。",
        date: "2019/10",
        id: "neminko",
        imageUrl: "/images/neminko.png",
        position: {
          x: -14,
          y: 6.925,
          z: -7.85,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/neminko.glb",
        title: "すやすやワールド",
      },
      {
        characters: ["ねみん子ちゃん", "たべん子ちゃん（parent/猫谷さん）"],
        comment:
          "食欲を犠牲に描いた一枚です。\n食べ物とちびキャラのセットって可愛いですよね…！",
        date: "2017/04",
        id: "pancake",
        imageUrl: "/images/pancake.png",
        position: {
          x: -15.28,
          y: 6.88,
          z: 8.82,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/pancake.glb",
        title: "たべねみパンケーキ！",
      },
      {
        characters: [
          "古明地こいし（東方Project）",
          "古明地さとり（東方Project）",
        ],
        comment:
          "※こちらの作品は二次創作作品です。\n\nロリータアレンジした古明地姉妹です。\n東方の子は原作の衣装がシンプル目なので、衣装アレンジするのがとても楽しい…！！",
        date: "2020/01",
        id: "satori_koishi",
        imageUrl: "/images/satori_koishi.png",
        position: {
          x: -0.37,
          y: 6.85,
          z: 2.12,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/satori_koishi.glb",
        title: "古明地姉妹（lolita arrange）",
      },
      {
        characters: ["天玖（てく）ちゃん"],
        comment:
          "天使の天玖ちゃんとショートケーキ。\n彼女のデザイン時にショートケーキをイメージしていたので一緒に描くとかなり映えますね！\n白くて甘くて幸せな気持ちにさせてくれるショートケーキって天使さんみたいだなって思います。",
        date: "2016/12",
        id: "strawberry_cake",
        imageUrl: "/images/strawberry_cake.png",
        position: {
          x: -21.5,
          y: 6.85,
          z: 10.85,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/strawberry_cake.glb",
        title: "イチゴのショートケーキ",
      },
      {
        characters: ["ねみん子ちゃん", "たべん子ちゃん（parent/猫谷さん）"],
        comment:
          "ねみん子ちゃんと仲良しのたべん子ちゃんと自撮りしてます。\n自撮りって女子高生っぽくていいですよね…！(コメントのおじいちゃん感…。)",
        date: "2021/02",
        id: "tabenemi",
        imageUrl: "/images/tabenemi.png",
        position: {
          x: -17.95,
          y: 6.85,
          z: 9,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/tabenemi.glb",
        title: "撮るよ～！",
      },
      {
        characters: ["ねみん子ちゃん"],
        comment:
          "こちらのイラストはギャラリーIYN様のグループ展「ふしぎな魔法少女展」に参加させていただいた絵です。\n\nねみん子ちゃん（夢の中Ver）。夢の中でくらい魔法少女に変身して活躍してもいいよねっ！\nこのくらいの時期からイラストの描き込みを増やしていきました。\nゆめかわいいお菓子に囲まれてみたいけど、実際お砂糖の匂いだけで胸焼けしそうになりそう…。（現実的…。）\n\nねみん子ちゃん「あ！この間の夢で出てきたお菓子の国だぁ～。ユニコーンに乗って移動したり、可愛いお菓子をいっぱい食べたりしたよ～。え？魔法少女になって何をしたのかって…？うーん…覚えてないや！」",
        date: "2019/12",
        id: "yumekawa",
        imageUrl: "/images/yumekawa.png",
        position: {
          x: -18.4,
          y: 6.89,
          z: -8.2,
        },
        rotation: {
          x: -11,
          y: 0,
          z: 0,
        },
        scale: {
          x: 1,
          y: 1,
          z: 1,
        },
        url: "/objects/areas/cloud/yumekawa.glb",
        title: "ゆめかわお菓子の国は夢",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: -2.95,
      y: 5.7,
      z: 13,
    },
    defaultRotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    defaultScale: {
      x: 0.5,
      y: 0.5,
      z: 0.5,
    },
    url: "/objects/player.glb",
  },
  sound: {
    url: "/sounds/cloud.mp3",
  },
};

export default area;
