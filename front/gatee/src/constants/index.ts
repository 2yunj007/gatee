import {Mood, Question, Emoji, ScheduleColor} from "@type/index";
import EmojiDogOne from "@assets/images/emoji/emoji_dog1.png";
import EmojiDogTwo from "@assets/images/emoji/emoji_dog2.png";
import EmojiDogThree from "@assets/images/emoji/emoji_dog3.png";
import EmojiDogFour from "@assets/images/emoji/emoji_dog4.png";
import EmojiJulOne from "@assets/images/emoji/emoji_jul1.png";
import EmojiJulTwo from "@assets/images/emoji/emoji_jul2.png";
import EmojiJulThree from "@assets/images/emoji/emoji_jul3.png";
import EmojiJulFour from "@assets/images/emoji/emoji_jul4.png";
import EmojiDogThumb from "@assets/images/emoji/emoji_dog_thumb.png";
import EmojiJulThumb from "@assets/images/emoji/emoji_jul_thumb.png";
import EmojiWhiteDogThumb from "@assets/images/emoji/emoji_white_dog_thumb.png";
import EmojiWhiteDogOne from "@assets/images/emoji/emoji_white_dog1.png";
import EmojiWhiteDogTwo from "@assets/images/emoji/emoji_white_dog2.png";
import EmojiWhiteDogThree from "@assets/images/emoji/emoji_white_dog3.png";
import EmojiWhiteDogFour from "@assets/images/emoji/emoji_white_dog4.png";
import EmojiBrownDogThumb from "@assets/images/emoji/emoji_brown_dog_thumb.png";
import EmojiBrownDogOne from "@assets/images/emoji/emoji_brown_dog1.png";
import EmojiBrownDogTwo from "@assets/images/emoji/emoji_brown_dog2.png";
import EmojiBrownDogThree from "@assets/images/emoji/emoji_brown_dog3.png";
import EmojiBrownDogFour from "@assets/images/emoji/emoji_brown_dog4.png";
import EmojiBlackDogThumb from "@assets/images/emoji/emoji_black_dog_thumb.png";
import EmojiBlackDogOne from "@assets/images/emoji/emoji_black_dog1.png";
import EmojiBlackDogTwo from "@assets/images/emoji/emoji_black_dog2.png";
import EmojiBlackDogThree from "@assets/images/emoji/emoji_black_dog3.png";
import EmojiBlackDogFour from "@assets/images/emoji/emoji_black_dog4.png";
import ScheduleIconBlue from "@assets/images/schedule/ic_calendar_blue.png";
import ScheduleIconGray from "@assets/images/schedule/ic_calendar_gray.png";
import ScheduleIconGreen from "@assets/images/schedule/ic_calendar_green.png";
import ScheduleIconMint from "@assets/images/schedule/ic_calendar_mint.png";
import ScheduleIconNavy from "@assets/images/schedule/ic_calendar_navy.png";
import ScheduleIconOrange from "@assets/images/schedule/ic_calendar_orange.png";
import ScheduleIconPink from "@assets/images/schedule/ic_calendar_pink.png";
import ScheduleIconPurple from "@assets/images/schedule/ic_calendar_purple.png";
import ScheduleIconRed from "@assets/images/schedule/ic_calendar_red.png";
import ScheduleIconYellow from "@assets/images/schedule/ic_calendar_yellow.png";

/* 대문자로 작성 */

// 이모티콘
export const EMOJI: Emoji[] = [
  {
    name: "dog",
    image: EmojiDogThumb,
    item: [
      { id: "dog1", image: EmojiDogOne },
      { id: "dog2", image: EmojiDogTwo },
      { id: "dog3", image: EmojiDogThree },
      { id: "dog4", image: EmojiDogFour },
    ]
  },
  {
    name: "white_dog",
    image: EmojiWhiteDogThumb,
    item: [
      { id: "white_dog1", image: EmojiWhiteDogOne },
      { id: "white_dog2", image: EmojiWhiteDogTwo },
      { id: "white_dog3", image: EmojiWhiteDogThree },
      { id: "white_dog4", image: EmojiWhiteDogFour },
    ]
  },
  {
    name: "black_dog",
    image: EmojiBlackDogThumb,
    item: [
      { id: "black_dog1", image: EmojiBlackDogOne },
      { id: "black_dog2", image: EmojiBlackDogTwo },
      { id: "black_dog3", image: EmojiBlackDogThree },
      { id: "black_dog4", image: EmojiBlackDogFour },
    ]
  },
  {
    name: "brown_dog",
    image: EmojiBrownDogThumb,
    item: [
      { id: "brown_dog1", image: EmojiBrownDogOne },
      { id: "brown_dog2", image: EmojiBrownDogTwo },
      { id: "brown_dog3", image: EmojiBrownDogThree },
      { id: "brown_dog4", image: EmojiBrownDogFour },
    ]
  },
  {
    name: "jul",
    image: EmojiJulThumb,
    item: [
      { id: "jul1", image: EmojiJulOne },
      { id: "jul2", image: EmojiJulTwo },
      { id: "jul3", image: EmojiJulThree },
      { id: "jul4", image: EmojiJulFour },
    ]
  },
];

// 기분
export const MOOD: Mood[] = [
  { name: "HAPPY", mood: "🥰", content: "행복해요"},
  { name: "SAD", mood: "😥", content: "슬퍼요" },
  { name: "ALONE", mood: "😑", content: "혼자 있고 싶어요" },
  { name: "ANGRY", mood: "🤬", content: "화나요" },
  { name: "FEAR", mood: "😱", content: "심란해요" },
  {name: "SLEEPY", mood: "😪", content: "피곤해요" },
]

// 일정 색상표
export const SCHEDULE_COLOR: ScheduleColor[] = [
  {name: "red", code: "#ffbbbb",  image: ScheduleIconRed},
  {name: "orange", code: "#ffd291",  image: ScheduleIconOrange},
  {name: "yellow", code: "#ffef98",  image: ScheduleIconYellow},
  {name: "green", code: "#caffb7",  image: ScheduleIconGreen},
  {name: "blue", code: "#bbdbff",  image: ScheduleIconBlue},
  {name: "navy", code: "#aeb8ff",  image: ScheduleIconNavy},
  {name: "purple", code: "#d9c8ff",  image: ScheduleIconPurple},
  {name: "mint", code: "#a8fadb",  image: ScheduleIconMint},
  {name: "pink", code: "#ffc3eb",  image: ScheduleIconPink},
  {name: "gray", code: "#bfbfbf",  image: ScheduleIconGray},
]

export const QUESTION = [
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
  {
    "nickname":"수지",
    "questionWord": "문제",
    "wrongAnswers": ["틀린 문장", "틀린 문장", "틀린 문장"],
    "correctAnswer": "정답 문장"
  },
]