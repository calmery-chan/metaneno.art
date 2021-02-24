import { Area } from "~/types/exhibition";

const area: Area = {
  areas: {
    sea: {
      maximumX: -8.5,
      maximumZ: -20,
      minimumX: -11.5,
      minimumZ: -22,
    },
  },
  background: {
    color: "#F8FFC9",
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
    url: "/objects/areas/meadow/collider.glb",
  },
  fog: {
    color: "#F8FFC9",
  },
  lights: {
    directional: {
      color: "#F9FDC2",
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    points: [],
  },
  objects: {
    characters: [
      {
        id: "flower_sheep",
        name: "",
        position: {
          x: 9.1,
          y: 3.8,
          z: -11,
        },
        rotation: {
          x: 0,
          y: 140,
          z: 0,
        },
        scenarios: [
          {
            branches: [
              {
                message: "行く",
                scenarios: [
                  {
                    actions: ["move_to_cloud"],
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
            message: "どうやら雲の上に連れて行ってくれるみたいだ。",
          },
        ],
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        url: "/objects/characters/flower_sheep.glb",
      },
      {
        id: "ameri_swing",
        name: "",
        position: {
          x: -21,
          y: 4.15,
          z: -13.1,
        },
        rotation: {
          x: 0,
          y: -124,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        url: "/objects/areas/meadow/ameri_swing.glb",
      },
      {
        id: "noneme_piano",
        name: "",
        position: {
          x: -1.365,
          y: 3.85,
          z: -11.56,
        },
        rotation: {
          x: 0,
          y: -257,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.595,
          y: 0.595,
          z: 0.595,
        },
        url: "/objects/areas/meadow/noneme_piano.glb",
      },
      {
        id: "hitugi",
        name: "",
        position: {
          x: -22.65,
          y: 3.9,
          z: -1.72,
        },
        rotation: {
          x: 0,
          y: -137,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "/objects/characters/hitugi.glb",
      },
      {
        id: "neminko",
        name: "",
        position: {
          x: 0,
          y: 3.8,
          z: 1,
        },
        rotation: {
          x: 0,
          y: -137,
          z: 0,
        },
        scenarios: [],
        scale: {
          x: 0.5,
          y: 0.5,
          z: 0.5,
        },
        url: "/objects/characters/neminko.glb",
      },
    ],
    components: [
      {
        name: "water",
        props: {
          y: 2.55,
        },
      },
    ],
    decorations: [
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
        url: "/objects/areas/meadow/boards.glb",
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
        url: "/objects/areas/meadow/terrain.glb",
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
        url: "/objects/areas/meadow/bushes.glb",
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
        url: "/objects/areas/meadow/flowers.glb",
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
        url: "/objects/areas/meadow/grasses.glb",
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
        url: "/objects/areas/meadow/trees.glb",
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
        url: "/objects/areas/meadow/waterlily.glb",
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
        url: "/objects/areas/meadow/tulips.glb",
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
        url: "/objects/areas/meadow/stones.glb",
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
        url: "/objects/areas/meadow/sunflowers.glb",
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
        url: "/objects/areas/meadow/stumps.glb",
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
        url: "/objects/areas/meadow/piano.glb",
      },
      {
        position: {
          x: -22.27,
          y: 4.15,
          z: -2.4,
        },
        rotation: {
          x: 0,
          y: -140,
          z: 0,
        },
        scale: {
          x: 3.2,
          y: 3.2,
          z: 3.2,
        },
        url: "/objects/areas/meadow/chair.glb",
      },
    ],
    items: [],
    works: [
      {
        characters: ["かるめりちゃん（parent/Calmeryさん）"],
        comment:
          "Calmeryさんのオリジナルキャラクター、かるめりちゃんを描く機会をいただいて描いた一枚です。\n夏！向日葵！日差し！シャッターチャンス！\n制服と向日葵…青春ですね！！",
        date: "2020/07",
        id: "ameri_sunflower",
        imageUrl: "/images/ameri_sunflower.png",
        position: {
          x: -18.72,
          y: 5.355,
          z: -14.3,
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
        title: "シャッターチャンス！",
        url: "/objects/areas/meadow/ameri_sunflower.glb",
      },
      {
        characters: ["りぃちゃん", "まいちゃん"],
        comment:
          "あつ森のイースターイベントにハマっていた時に描いたイラストです。\nエッグにイラストや模様を描いて楽しむなんて…いつかやってみたいですね…！",
        date: "2020/04",
        id: "easter_egg",
        imageUrl: "/images/easter_egg.png",
        position: {
          x: -10.05,
          y: 5.135,
          z: 0.143,
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
        title: "Happy Easter !",
        url: "/objects/areas/meadow/easter_egg.glb",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\nネモフィラです。\n舞っているハートは花びらなのか、こいしちゃんが無意識に出している弾幕なのか…？\n広大なネモフィラ畑に行って青色に包まれたい…。",
        date: "2020/05",
        id: "koishi",
        imageUrl: "/images/koishi.png",
        position: {
          x: 6.6,
          y: 5.23,
          z: -6,
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
        title: "閉じた青い瞳",
        url: "/objects/areas/meadow/koishi.glb",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n「花隠れ」をテーマにした同人本に収録した一枚です。\n沢山の青色の紫陽花に囲まれるこいしちゃん。\n青色の第三の眼はどこでしょう。\nサードアイを探さないで！",
        date: "2019/10",
        id: "koishi_hydrangea",
        imageUrl: "/images/koishi_hydrangea.png",
        position: {
          x: 13.85,
          y: 5.455,
          z: -10.8,
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
        title: "雨と紫陽花の色",
        url: "/objects/areas/meadow/koishi_hydrangea.glb",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n「花隠れ」をテーマにした同人本に収録した一枚です。\n現実で花びらが舞っていても顔が隠れないように花びらが舞ってくれることってほぼないですよね。\nそんなもどかしさを表現したくて片目を花びらで隠してみました。\nこいしちゃんは第三の眼を閉じてしまっているので、視野が狭くなっている…という意味も込めていたり。",
        date: "2019/10",
        id: "koishi_sakura",
        imageUrl: "/images/koishi_sakura.png",
        position: {
          x: -3.07,
          y: 5.24,
          z: -6,
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
        title: "春色こいしちゃん",
        url: "/objects/areas/meadow/koishi_sakura.glb",
      },
      {
        characters: ["古明地こいし（東方Project）"],
        comment:
          "※こちらの作品は二次創作作品です。\n\n「花隠れ」をテーマにした同人本に収録した一枚です。\nひまわり畑の中に潜む妖怪少女…。\n右にある向日葵だけこいしちゃんのほうを向いています。",
        date: "2019/10",
        id: "koishi_sunflower",
        imageUrl: "/images/koishi_sunflower.png",
        position: {
          x: -13.9,
          y: 5.335,
          z: -15.4,
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
        title: "向日葵とこいしちゃん",
        url: "/objects/areas/meadow/koishi_sunflower.glb",
      },
      {
        characters: ["りぃちゃん"],
        comment:
          "シロツメクサです。\n割と何処にでも生えている植物ですね。\n自分が小さいころは四つ葉のクローバー探しや花冠作りをして楽しんでいました。\n\nりぃちゃん「みてみて！四つ葉のクローバー見つけたんだよ～！この日はお日様ぽかぽかで気持ちよかったー♪　四葉のクローバー見つけた後はそのままお昼寝しちゃった…」",
        date: "2020/02",
        id: "lee_white_clover",
        imageUrl: "/images/lee_white_clover.png",
        position: {
          x: -7.65,
          y: 5.265,
          z: 0.55,
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
        title: "シロツメクサは幸せの匂い",
        url: "/objects/areas/meadow/lee_white_clover.glb",
      },
      {
        characters: ["ノネメちゃん"],
        comment:
          "ドライフラワーを家に飾りたい気持ちで描いた絵です。\n綺麗に咲いている状態の花を日陰に吊るして乾燥させるってちょっと物騒ですよね。\nほのかに木漏れ日を浴びせてあげたくなりました。\n\nノネメ「木漏れ日、好き…。」",
        date: "2020/12",
        id: "noneme_dry",
        imageUrl: "/images/noneme_dry.png",
        position: {
          x: 5.2,
          y: 5.4,
          z: -14,
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
        title: "綺麗なまま乾燥していく",
        url: "/objects/areas/meadow/noneme_dry.glb",
      },
      {
        characters: ["ノネメちゃん"],
        comment:
          "家にちょっと変わった形のひまわりが届いたので描いた一枚です。\nノネメちゃんはオシャレなので毎回違う衣装を着ています。\n\nノネメ「袖のリボンがほどけると結びなおすのが大変…。」",
        date: "2020/07",
        id: "noneme_sunflower",
        imageUrl: "/images/noneme_sunflower.png",
        position: {
          x: -4.2,
          y: 5.45,
          z: -15.35,
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
        title: "ひまわり",
        url: "/objects/areas/meadow/noneme_sunflower.glb",
      },
      {
        characters: ["えっと…。"],
        comment:
          "天気は下り坂、気持ちも下り坂。\nビニール傘から覗く曇った景色が好きです。",
        date: "2017/07",
        id: "rainy_season",
        imageUrl: "/images/rainy_season.png",
        position: {
          x: 17.765,
          y: 5.3,
          z: -11,
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
        title: "下り坂",
        url: "/objects/areas/meadow/rainy_season.glb",
      },
      {
        characters: ["レドちゃん"],
        comment:
          "家に濃い赤ガーベラが届いたので、レドちゃんに思いを馳せての一枚です。\n赤以外の彩度を落としまくって彼女が見ているであろう世界を表現してみました。\n赤色しか視えない彼女に赤色の花は、似合っているのか皮肉交じりなのか…。",
        date: "2020/11",
        id: "red_gerbera",
        imageUrl: "/images/red_gerbera.png",
        position: {
          x: 15.35,
          y: 5.275,
          z: -1,
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
        title: "赤目の狼の子",
        url: "/objects/areas/meadow/red_gerbera.glb",
      },
      {
        characters: ["レドちゃん"],
        comment:
          "彼岸花です。\n赤って目立って鮮やかな色ですが、危険信号を表す意味もあったりで見ていてドキドキする色ですね。\n赤色しか視えない彼女は、赤色に追われ続ける。",
        date: "2020/12",
        id: "red_spider_lily",
        imageUrl: "/images/red_spider_lily.png",
        position: {
          x: 19.575,
          y: 5.12,
          z: -0.65,
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
        title: "赤色に追われて",
        url: "/objects/areas/meadow/red_spider_lily.glb",
      },
      {
        characters: ["…。"],
        comment:
          "冬が明けて春になっても気象が不安定なことが多いですよね。\nせっかく桜が咲いても、冷たい雨に打たれて散っていって様子をみると切ない気持ちになります。\n暖かいような、冷たいような、そんな季節。",
        date: "2020/03",
        id: "sakura",
        imageUrl: "/images/sakura.png",
        position: {
          x: -7.525,
          y: 5.257,
          z: -5.9,
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
        title: "雨桜",
        url: "/objects/areas/meadow/sakura.glb",
      },
    ],
  },
  player: {
    defaultPosition: {
      x: -21.9,
      y: 3.8,
      z: -0.6,
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
    url: "/sounds/meadow.mp3",
  },
};

export default area;
