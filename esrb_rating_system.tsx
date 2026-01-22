import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, AlertCircle, CheckCircle } from 'lucide-react';

const ESRBRatingSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [edsaContext, setEdsaContext] = useState({});
  const [themeAnswers, setThemeAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  // 주제 관련 질문 (게임의 핵심 테마)
  const themeQuestions = [
    { id: 'theme_incest', text: '근친상간이 게임의 주요 주제이거나 중요한 요소입니까?', instantRating: 'AO' },
    { id: 'theme_prostitution', text: '성매매가 게임의 주요 주제이거나 플레이 가능한 요소입니까?', instantRating: 'AO' },
    { id: 'theme_serial_murder', text: '연쇄 살인이 게임의 핵심 주제입니까?', instantRating: 'M_HIGH' },
    { id: 'theme_child_abuse', text: '아동 학대가 게임의 주요 주제입니까?', instantRating: 'AO' },
    { id: 'theme_sexual_violence', text: '성폭력이 게임의 주요 주제이거나 묘사됩니까?', instantRating: 'AO' },
    { id: 'theme_human_trafficking', text: '인신매매가 게임의 주요 주제입니까?', instantRating: 'M_HIGH' },
    { id: 'theme_extreme_racism', text: '인종차별이나 증오 범죄가 게임의 핵심 주제입니까?', instantRating: 'AO' },
    { id: 'theme_terrorism', text: '테러리즘이 게임의 주요 주제이며 긍정적으로 묘사됩니까?', instantRating: 'M_HIGH' },
    { id: 'theme_drug_dealing', text: '마약 거래가 게임의 핵심 플레이 요소입니까?', instantRating: 'M_MEDIUM' },
    { id: 'theme_organized_crime', text: '조직 범죄나 갱단 활동이 게임의 주요 주제입니까?', instantRating: 'M_LOW' },
  ];

  // 240개 이상의 상세 질문
  const questions = [
    // === 폭력성 (50개) ===
    { id: 1, category: 'violence', text: '게임에 사람을 죽이는 장면이 포함되어 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 2, category: 'violence', text: '동물을 죽이는 장면이 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 3, category: 'violence', text: '피가 표현되는 전투나 폭력 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 4, category: 'violence', text: '다량의 출혈이나 피 웅덩이가 표현됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 5, category: 'violence', text: '신체 절단 장면이 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 6, category: 'violence', text: '내장 노출이나 신체 훼손이 상세히 묘사됩니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 7, category: 'violence', text: '현실적이고 사실적인 폭력 묘사가 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 8, category: 'violence', text: '고문 장면이 포함되어 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 9, category: 'violence', text: '학대나 가정폭력 장면이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 10, category: 'violence', text: '민간인을 의도적으로 살상할 수 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: false },
    { id: 11, category: 'violence', text: '어린이에 대한 폭력이 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 12, category: 'violence', text: '근접 전투나 격투 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 13, category: 'violence', text: '총기 사용이 게임의 주요 요소입니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 14, category: 'violence', text: '칼이나 날붙이를 사용한 폭력이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 15, category: 'violence', text: '폭발이나 대규모 파괴 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 16, category: 'violence', text: '만화적이거나 비현실적인 폭력이 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 17, category: 'violence', text: '참수 장면이 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 18, category: 'violence', text: '뼈가 부러지거나 골절되는 장면이 상세히 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 19, category: 'violence', text: '시체나 사체가 표현됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 20, category: 'violence', text: '부패한 시체나 좀비가 등장합니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 21, category: 'violence', text: '자해 행위가 묘사됩니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 22, category: 'violence', text: '자살 장면이나 암시가 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 23, category: 'violence', text: '테러 행위가 묘사되거나 플레이어가 수행할 수 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 24, category: 'violence', text: '전쟁 범죄 행위가 가능합니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 25, category: 'violence', text: '대량 학살이나 집단 살해가 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 26, category: 'violence', text: '식인 행위가 묘사됩니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 27, category: 'violence', text: '동물 학대가 상세히 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 28, category: 'violence', text: '목 조르기나 질식시키는 장면이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 29, category: 'violence', text: '독극물이나 화학 무기 사용이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 30, category: 'violence', text: '화상이나 불에 타는 장면이 상세히 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 31, category: 'violence', text: '익사하는 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 32, category: 'violence', text: '추락사 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 33, category: 'violence', text: '차량을 이용한 폭력이나 살상이 가능합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 34, category: 'violence', text: '무차별 폭력이나 대량 살상이 게임 목표입니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 35, category: 'violence', text: '생물학 무기나 바이러스 무기가 등장합니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 36, category: 'violence', text: '핵무기 사용이 가능합니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 37, category: 'violence', text: '고문 도구나 고문 장치가 상세히 묘사됩니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 38, category: 'violence', text: '폭력이 보상 시스템과 연결되어 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 39, category: 'violence', text: '플레이어가 폭력을 즐기도록 유도합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 40, category: 'violence', text: '전쟁이나 군사 작전이 게임의 배경입니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 41, category: 'violence', text: '역사적 전투나 전쟁을 재현합니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 42, category: 'violence', text: '좀비나 몬스터와의 전투가 주요 요소입니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 43, category: 'violence', text: 'SF 무기나 미래형 무기가 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 44, category: 'violence', text: '마법이나 초능력을 사용한 공격이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 45, category: 'violence', text: '스포츠 게임에서의 격렬한 신체 접촉이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 46, category: 'violence', text: '의료 시술이나 수술 장면이 묘사됩니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 47, category: 'violence', text: '해부학적으로 정확한 인체 손상이 표현됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 48, category: 'violence', text: '고통이나 비명이 사실적으로 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 49, category: 'violence', text: '처형 장면이 포함되어 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 50, category: 'violence', text: '생체 실험이나 인간 실험이 묘사됩니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },

    // === 성적 콘텐츠 (40개) ===
    { id: 51, category: 'sexual', text: '나체나 부분 노출이 표현됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 52, category: 'sexual', text: '성행위 장면이 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 53, category: 'sexual', text: '성적인 암시나 대화가 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 54, category: 'sexual', text: '선정적인 의상이나 캐릭터 디자인이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 55, category: 'sexual', text: '키스나 애무 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 56, category: 'sexual', text: '성기가 노출됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 57, category: 'sexual', text: '가슴 노출이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 58, category: 'sexual', text: '엉덩이가 노골적으로 표현됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 59, category: 'sexual', text: '성적 흥분을 유발하는 장면이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 60, category: 'sexual', text: '성적 서비스나 성매매가 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 61, category: 'sexual', text: '스트립 클럽이나 성인 업소가 등장합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 62, category: 'sexual', text: '성적 농담이나 외설적 유머가 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 63, category: 'sexual', text: '속옷이 노출되는 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 64, category: 'sexual', text: '성적인 춤이나 동작이 포함되어 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 65, category: 'sexual', text: '로맨스나 연애가 게임의 주요 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 66, category: 'sexual', text: '캐릭터 간의 성적 긴장이나 관계가 묘사됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 67, category: 'sexual', text: '성적 콘텐츠를 선택하거나 건너뛸 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 68, category: 'sexual', text: '성 관련 교육이나 정보가 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 69, category: 'sexual', text: '포르노그래피가 포함되어 있습니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 70, category: 'sexual', text: '성폭력이나 강간이 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 71, category: 'sexual', text: '미성년자의 성적 묘사가 있습니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 72, category: 'sexual', text: '근친상간이 묘사되거나 암시됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 73, category: 'sexual', text: '성적 도착이나 페티시가 포함되어 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: false },
    { id: 74, category: 'sexual', text: '음란물이나 외설적 이미지가 있습니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 75, category: 'sexual', text: '신체의 성적 부위가 강조됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 76, category: 'sexual', text: '성적인 소리나 신음이 포함되어 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 77, category: 'sexual', text: '임신이나 출산 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 78, category: 'sexual', text: '성 정체성이나 성적 지향이 다루어집니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 79, category: 'sexual', text: '수영복이나 비키니 착용 장면이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 80, category: 'sexual', text: '목욕이나 샤워 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 81, category: 'sexual', text: '캐릭터 커스터마이징에서 신체 부위를 조정할 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 82, category: 'sexual', text: '성적인 텍스트나 메시지가 표시됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 83, category: 'sexual', text: '성매매 알선이나 인신매매가 묘사됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 84, category: 'sexual', text: '성적 학대나 착취가 포함되어 있습니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 85, category: 'sexual', text: '동물과의 성적 행위가 암시됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 86, category: 'sexual', text: '사체와의 성적 행위가 암시됩니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 87, category: 'sexual', text: '성 관련 범죄가 게임 플레이 요소입니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: true },
    { id: 88, category: 'sexual', text: '데이트나 구애 시뮬레이션이 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 89, category: 'sexual', text: '성인 잡지나 성적 미디어가 게임 내에 등장합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 90, category: 'sexual', text: '의료적 맥락에서의 나체나 신체 노출이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },

    // === 언어 (30개) ===
    { id: 91, category: 'language', text: '욕설이나 비속어가 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 92, category: 'language', text: '성적인 욕설이나 음란한 언어가 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 93, category: 'language', text: 'F-word나 이에 준하는 강한 욕설이 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 94, category: 'language', text: '신을 모독하는 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 95, category: 'language', text: '인종 차별적 언어나 슬러(slur)가 사용됩니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 96, category: 'language', text: '성차별적 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 97, category: 'language', text: '동성애 혐오 언어가 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 98, category: 'language', text: '장애인 비하 언어가 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 99, category: 'language', text: '종교 비하 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 100, category: 'language', text: '경미한 욕설(예: damn, hell)이 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 101, category: 'language', text: '폭력적이거나 위협적인 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 102, category: 'language', text: '욕설이 빈번하게 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 103, category: 'language', text: '캐릭터들이 서로를 모욕하거나 비난합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 104, category: 'language', text: '속어나 은어가 광범위하게 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 105, category: 'language', text: '성기를 지칭하는 속어가 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 106, category: 'language', text: '배설물 관련 욕설이 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 107, category: 'language', text: '증오 발언(hate speech)이 포함되어 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 108, category: 'language', text: '괴롭힘이나 사이버 불링 언어가 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 109, category: 'language', text: '음성 채팅이나 텍스트 채팅이 가능합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 110, category: 'language', text: '플레이어가 생성한 콘텐츠에 부적절한 언어가 포함될 수 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 111, category: 'language', text: '욕설 필터나 검열 시스템이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 112, category: 'language', text: '역사적 맥락에서 차별적 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 113, category: 'language', text: '교육적 목적으로 부적절한 언어가 설명됩니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 114, category: 'language', text: '캐릭터의 성격을 나타내기 위해 욕설이 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 115, category: 'language', text: '유머나 코미디 목적으로 욕설이 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 116, category: 'language', text: '긴장감이나 드라마를 위해 강한 언어가 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 117, category: 'language', text: '다국어로 욕설이 표현됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 118, category: 'language', text: '자막이나 텍스트에 욕설이 포함됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 119, category: 'language', text: '음성으로 욕설이 들립니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 120, category: 'language', text: '검열된 욕설(예: f**k)이 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },

    // === 약물 및 알코올 (25개) ===
    { id: 121, category: 'drugs', text: '불법 약물이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 122, category: 'drugs', text: '약물 사용 장면이 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 123, category: 'drugs', text: '알코올이나 술이 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 124, category: 'drugs', text: '흡연이나 담배 사용이 묘사됩니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 125, category: 'drugs', text: '마약 거래가 게임 플레이 요소입니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: false },
    { id: 126, category: 'drugs', text: '약물 제조 과정이 묘사됩니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 127, category: 'drugs', text: '술에 취한 캐릭터가 등장합니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 128, category: 'drugs', text: '약물 중독이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 129, category: 'drugs', text: '환각 상태나 환각 효과가 표현됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 130, category: 'drugs', text: '주사기나 약물 복용 도구가 표현됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 131, category: 'drugs', text: '약물 남용이 긍정적으로 묘사됩니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: false },
    { id: 132, category: 'drugs', text: '술집이나 바가 게임 배경으로 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 133, category: 'drugs', text: '약물이 게임 내 능력 향상 아이템으로 사용됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 134, category: 'drugs', text: '처방약이나 의료용 약물이 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 135, category: 'drugs', text: '약물 관련 범죄가 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 136, category: 'drugs', text: '대마초나 마리화나가 등장합니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 137, category: 'drugs', text: '코카인이나 헤로인이 등장합니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 138, category: 'drugs', text: '마약 카르텔이나 조직이 등장합니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 139, category: 'drugs', text: '약물 과다 복용 장면이 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 140, category: 'drugs', text: '약물 재활이나 치료가 다루어집니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 141, category: 'drugs', text: '합법 약물(카페인, 니코틴)이 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 142, category: 'drugs', text: '약물 교육이나 예방 메시지가 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 143, category: 'drugs', text: '역사적 맥락에서 약물 사용이 묘사됩니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 144, category: 'drugs', text: '환각제나 LSD가 등장합니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: true },
    { id: 145, category: 'drugs', text: '흡입제나 본드 흡입이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },

    // === 공포 및 호러 (25개) ===
    { id: 146, category: 'horror', text: '공포스러운 장면이나 점프 스케어가 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 147, category: 'horror', text: '피나 고어가 공포 요소로 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 148, category: 'horror', text: '귀신이나 유령이 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 149, category: 'horror', text: '심리적 공포 요소가 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 150, category: 'horror', text: '어두운 분위기나 불안감을 조성합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 151, category: 'horror', text: '몬스터나 괴물이 등장합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 152, category: 'horror', text: '좀비나 언데드가 등장합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 153, category: 'horror', text: '악마나 초자연적 존재가 등장합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 154, category: 'horror', text: '공포 음향 효과가 사용됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 155, category: 'horror', text: '비명이나 고통의 소리가 포함되어 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 156, category: 'horror', text: '서스펜스나 긴장감이 주요 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 157, category: 'horror', text: '잔인한 장면이 공포 목적으로 사용됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 158, category: 'horror', text: '인체 변형이나 기형이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 159, category: 'horror', text: '악몽이나 환각 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 160, category: 'horror', text: '폐쇄 공포증을 유발할 수 있는 환경이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 161, category: 'horror', text: '공포가 게임의 핵심 장르입니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 162, category: 'horror', text: '어린이를 겁주는 요소가 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 163, category: 'horror', text: '정신 질환이나 광기가 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 164, category: 'horror', text: '괴기스러운 이미지나 불쾌한 장면이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 165, category: 'horror', text: '생명체의 고통이나 괴로움이 강조됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 166, category: 'horror', text: '미스터리나 서스펜스 스릴러 요소가 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 167, category: 'horror', text: '공포 분위기가 지속적으로 유지됩니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 168, category: 'horror', text: '귀신의 집이나 유령 저택이 배경입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 169, category: 'horror', text: '오컬트나 사탄 숭배가 등장합니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 170, category: 'horror', text: '살아있는 시체나 신체 절단 공포가 있습니까?', severity: 'high', instantRating: null, edsaApplicable: false },

    // === 도박 및 게임 내 구매 (20개) ===
    { id: 171, category: 'gambling', text: '실제 돈으로 구매 가능한 아이템이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 172, category: 'gambling', text: '룩박스나 확률형 아이템이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 173, category: 'gambling', text: '카지노 게임이 포함되어 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 174, category: 'gambling', text: '포커, 블랙잭 등 카드 도박이 가능합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 175, category: 'gambling', text: '슬롯 머신이 등장합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 176, category: 'gambling', text: '실제 돈으로 도박을 할 수 있습니까?', severity: 'critical', instantRating: 'AO', edsaApplicable: false },
    { id: 177, category: 'gambling', text: '가상 화폐로 도박을 할 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 178, category: 'gambling', text: '게임 내 화폐를 실제 돈으로 전환할 수 있습니까?', severity: 'critical', instantRating: 'M_MEDIUM', edsaApplicable: false },
    { id: 179, category: 'gambling', text: '경마나 스포츠 베팅이 가능합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 180, category: 'gambling', text: '복권이나 추첨이 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 181, category: 'gambling', text: '가챠 시스템이 있습니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 182, category: 'gambling', text: '확률 공개가 되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 183, category: 'gambling', text: '과금 유도 요소가 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 184, category: 'gambling', text: '게임 진행에 과금이 필수입니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 185, category: 'gambling', text: '주사위나 확률 게임이 중요한 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 186, category: 'gambling', text: '도박이 게임의 주요 메커니즘입니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 187, category: 'gambling', text: '미니 게임으로 도박이 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 188, category: 'gambling', text: '광고가 표시됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 189, category: 'gambling', text: '구독 모델이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 190, category: 'gambling', text: '시즌 패스나 배틀 패스가 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },

    // === 범죄 및 불법 행위 (20개) ===
    { id: 191, category: 'crime', text: '절도나 강도 행위가 가능합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 192, category: 'crime', text: '차량 절도가 게임 플레이 요소입니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 193, category: 'crime', text: '은행 강도나 대규모 절도가 가능합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 194, category: 'crime', text: '경찰로부터 도망치는 것이 게임 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 195, category: 'crime', text: '범죄 조직의 일원으로 플레이합니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 196, category: 'crime', text: '해킹이나 사이버 범죄가 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 197, category: 'crime', text: '폭력배나 갱단 활동이 게임의 주요 요소입니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 198, category: 'crime', text: '밀수나 밀매가 게임 플레이에 포함됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 199, category: 'crime', text: '불법 무기 거래가 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 200, category: 'crime', text: '범죄가 긍정적으로 묘사되거나 보상됩니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 201, category: 'crime', text: '공공 기물 파손이 가능합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 202, category: 'crime', text: '사기나 금융 범죄가 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 203, category: 'crime', text: '위조나 변조 행위가 게임에 포함됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 204, category: 'crime', text: '납치나 인질극이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 205, category: 'crime', text: '돈세탁이나 자금 세탁이 게임 요소입니까?', severity: 'high', instantRating: null, edsaApplicable: false },
    { id: 206, category: 'crime', text: '불법 레이싱이나 과속이 게임의 주요 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 207, category: 'crime', text: '방화나 폭파가 가능합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },
    { id: 208, category: 'crime', text: '위법 행위가 교육적 맥락에서 다루어집니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 209, category: 'crime', text: '범죄 수사나 탐정 활동이 게임의 주요 요소입니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 210, category: 'crime', text: '불법 침입이나 무단 침입이 가능합니까?', severity: 'medium', instantRating: null, edsaApplicable: false },

    // === 차별 및 혐오 (15개) ===
    { id: 211, category: 'discrimination', text: '인종 차별적 콘텐츠가 포함되어 있습니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 212, category: 'discrimination', text: '성차별적 고정관념이 강화됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 213, category: 'discrimination', text: '종교적 편견이나 차별이 묘사됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 214, category: 'discrimination', text: '장애인에 대한 차별이나 조롱이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 215, category: 'discrimination', text: '성적 지향에 대한 차별이 포함됩니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 216, category: 'discrimination', text: '나이 차별이나 연령주의가 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 217, category: 'discrimination', text: '국적이나 민족에 대한 편견이 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },
    { id: 218, category: 'discrimination', text: '계급이나 사회적 지위에 따른 차별이 묘사됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 219, category: 'discrimination', text: '외모 차별이나 외모 지상주의가 강조됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 220, category: 'discrimination', text: '혐오 상징이나 극단주의 상징이 등장합니까?', severity: 'critical', instantRating: 'M_HIGH', edsaApplicable: true },
    { id: 221, category: 'discrimination', text: '역사적 맥락에서 차별이 다루어집니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 222, category: 'discrimination', text: '차별에 반대하는 메시지가 포함되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: true },
    { id: 223, category: 'discrimination', text: '다양성과 포용성이 긍정적으로 묘사됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 224, category: 'discrimination', text: '문화적 고정관념이 강화됩니까?', severity: 'medium', instantRating: null, edsaApplicable: true },
    { id: 225, category: 'discrimination', text: '사회적 약자에 대한 부정적 묘사가 있습니까?', severity: 'high', instantRating: null, edsaApplicable: true },

    // === 온라인 및 데이터 (15개) ===
    { id: 226, category: 'online', text: '온라인 멀티플레이어가 가능합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 227, category: 'online', text: '다른 플레이어와 채팅할 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 228, category: 'online', text: '음성 채팅이 가능합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 229, category: 'online', text: '플레이어가 생성한 콘텐츠를 공유할 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 230, category: 'online', text: '개인정보를 수집합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 231, category: 'online', text: '위치 정보를 사용합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 232, category: 'online', text: '소셜 미디어 연동이 가능합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 233, category: 'online', text: '미성년자 보호 기능이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 234, category: 'online', text: '사용자 차단 기능이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 235, category: 'online', text: '신고 시스템이 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 236, category: 'online', text: '낯선 사람과 상호작용할 수 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 237, category: 'online', text: '개인정보 처리방침이 명시되어 있습니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 238, category: 'online', text: '광고 추적이 이루어집니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 239, category: 'online', text: '제3자와 데이터를 공유합니까?', severity: 'low', instantRating: null, edsaApplicable: false },
    { id: 240, category: 'online', text: '부모 통제 기능이 제공됩니까?', severity: 'low', instantRating: null, edsaApplicable: false },
  ];

  const categoryNames = {
    violence: '폭력성',
    sexual: '성적 콘텐츠',
    language: '언어',
    drugs: '약물 및 알코올',
    horror: '공포',
    gambling: '도박 및 인앱 구매',
    crime: '범죄 행위',
    discrimination: '차별 및 혐오',
    online: '온라인 기능 및 데이터'
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleEdsaAnswer = (questionId, isEdsa) => {
    setEdsaContext(prev => ({ ...prev, [questionId]: isEdsa }));
  };

  const handleThemeAnswer = (themeId, answer) => {
    setThemeAnswers(prev => ({ ...prev, [themeId]: answer }));
  };

  const calculateRating = () => {
    // 주제 기반 즉시 등급 확인
    for (const theme of themeQuestions) {
      if (themeAnswers[theme.id] === 'yes') {
        return { rating: theme.instantRating, reason: `주제: ${theme.text}` };
      }
    }

    let highestRating = 'E';
    const descriptors = [];
    const categoryScores = {};

    // 카테고리별 점수 계산
    questions.forEach(q => {
      if (answers[q.id] === 'yes') {
        // EDSA 맥락 확인 - EDSA인 경우 심각도 한 단계 낮춤
        const isEdsa = q.edsaApplicable && edsaContext[q.id] === 'yes';
        
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { score: 0, edsaScore: 0 };
        }

        if (isEdsa) {
          // EDSA 맥락에서는 점수를 낮게 계산
          if (q.severity === 'critical') categoryScores[q.category].edsaScore += 2;
          else if (q.severity === 'high') categoryScores[q.category].edsaScore += 1;
          else categoryScores[q.category].edsaScore += 0.5;
        } else {
          // 일반 점수 계산
          if (q.severity === 'critical') categoryScores[q.category].score += 4;
          else if (q.severity === 'high') categoryScores[q.category].score += 3;
          else if (q.severity === 'medium') categoryScores[q.category].score += 2;
          else categoryScores[q.category].score += 1;
        }

        // 즉시 등급 상향
        if (q.instantRating && !isEdsa) {
          const ratingOrder = ['E', 'E10', 'T', 'M_LOW', 'M_MEDIUM', 'M_HIGH', 'AO'];
          const currentIndex = ratingOrder.indexOf(highestRating);
          const newIndex = ratingOrder.indexOf(q.instantRating);
          if (newIndex > currentIndex) {
            highestRating = q.instantRating;
            descriptors.push(q.text);
          }
        }
      }
    });

    // 총점 계산 (일반 점수 + EDSA 점수)
    Object.keys(categoryScores).forEach(cat => {
      categoryScores[cat].total = categoryScores[cat].score + categoryScores[cat].edsaScore;
    });

    // ESRB 스타일 등급 결정
    const violenceScore = categoryScores.violence?.total || 0;
    const sexualScore = categoryScores.sexual?.total || 0;
    const languageScore = categoryScores.language?.total || 0;
    const drugsScore = categoryScores.drugs?.total || 0;
    const horrorScore = categoryScores.horror?.total || 0;
    const gamblingScore = categoryScores.gambling?.total || 0;
    const crimeScore = categoryScores.crime?.total || 0;
    const discriminationScore = categoryScores.discrimination?.total || 0;

    // AO (Adults Only) - 18세 이상
    if (highestRating === 'AO' ||
        sexualScore >= 15 ||
        violenceScore >= 20 ||
        discriminationScore >= 12) {
      highestRating = 'AO';
      if (sexualScore >= 15) descriptors.push('노골적인 성적 콘텐츠');
      if (violenceScore >= 20) descriptors.push('극도로 강한 폭력');
      if (discriminationScore >= 12) descriptors.push('극단적인 혐오 콘텐츠');
    }
    // M (Mature) - 17세 이상
    else if (highestRating === 'M_HIGH' ||
        violenceScore >= 15 ||
        sexualScore >= 10 ||
        drugsScore >= 10 ||
        languageScore >= 12) {
      highestRating = 'M_HIGH';
      if (violenceScore >= 15) descriptors.push('강렬한 폭력');
      if (sexualScore >= 10) descriptors.push('강한 성적 콘텐츠');
      if (drugsScore >= 10) descriptors.push('약물 사용');
      if (languageScore >= 12) descriptors.push('강한 언어');
    }
    else if (highestRating === 'M_MEDIUM' ||
        violenceScore >= 12 ||
        sexualScore >= 8 ||
        drugsScore >= 8 ||
        languageScore >= 10 ||
        crimeScore >= 15) {
      highestRating = 'M_MEDIUM';
      if (violenceScore >= 12) descriptors.push('강한 폭력');
      if (sexualScore >= 8) descriptors.push('성적 콘텐츠');
      if (drugsScore >= 8) descriptors.push('약물 언급 및 사용');
      if (languageScore >= 10) descriptors.push('강한 언어');
      if (crimeScore >= 15) descriptors.push('범죄 활동');
    }
    else if (highestRating === 'M_LOW' ||
        violenceScore >= 10 ||
        sexualScore >= 6 ||
        drugsScore >= 6 ||
        languageScore >= 8 ||
        horrorScore >= 12 ||
        crimeScore >= 12) {
      highestRating = 'M_LOW';
      if (violenceScore >= 10) descriptors.push('폭력');
      if (sexualScore >= 6) descriptors.push('성적 주제');
      if (drugsScore >= 6) descriptors.push('약물 언급');
      if (languageScore >= 8) descriptors.push('부적절한 언어');
      if (horrorScore >= 12) descriptors.push('강렬한 공포');
      if (crimeScore >= 12) descriptors.push('범죄 주제');
    }
    // T (Teen) - 13세 이상
    else if (violenceScore >= 8 ||
        sexualScore >= 4 ||
        drugsScore >= 4 ||
        languageScore >= 6 ||
        horrorScore >= 9 ||
        crimeScore >= 9 ||
        discriminationScore >= 6) {
      highestRating = 'T_HIGH';
      if (violenceScore >= 8) descriptors.push('폭력');
      if (sexualScore >= 4) descriptors.push('성적 암시');
      if (drugsScore >= 4) descriptors.push('약물 언급');
      if (languageScore >= 6) descriptors.push('경미한 언어');
      if (horrorScore >= 9) descriptors.push('공포 주제');
      if (crimeScore >= 9) descriptors.push('범죄 주제');
    }
    else if (violenceScore >= 6 ||
        sexualScore >= 3 ||
        drugsScore >= 3 ||
        languageScore >= 4 ||
        horrorScore >= 6 ||
        crimeScore >= 6) {
      highestRating = 'T_MEDIUM';
      if (violenceScore >= 6) descriptors.push('만화적 폭력');
      if (sexualScore >= 3) descriptors.push('경미한 성적 암시');
      if (languageScore >= 4) descriptors.push('경미한 언어');
      if (horrorScore >= 6) descriptors.push('경미한 공포');
    }
    else if (violenceScore >= 4 ||
        sexualScore >= 2 ||
        languageScore >= 2 ||
        horrorScore >= 4 ||
        crimeScore >= 4) {
      highestRating = 'T_LOW';
      if (violenceScore >= 4) descriptors.push('경미한 폭력');
      if (sexualScore >= 2) descriptors.push('경미한 암시적 주제');
      if (languageScore >= 2) descriptors.push('순한 언어');
    }
    // E10+ (Everyone 10+) - 10세 이상
    else if (violenceScore >= 2 ||
        sexualScore >= 1 ||
        languageScore >= 1 ||
        horrorScore >= 2 ||
        crimeScore >= 2) {
      highestRating = 'E10_HIGH';
      if (violenceScore >= 2) descriptors.push('판타지 폭력');
      if (sexualScore >= 1) descriptors.push('경미한 암시적 주제');
      if (languageScore >= 1) descriptors.push('경미한 언어');
      if (horrorScore >= 2) descriptors.push('경미한 만화적 공포');
    }
    else if (violenceScore >= 1 || gamblingScore >= 1) {
      highestRating = 'E10_LOW';
      if (violenceScore >= 1) descriptors.push('만화적 폭력');
      if (gamblingScore >= 1) descriptors.push('모의 도박');
    }
    // E (Everyone) - 전체 이용가
    else {
      highestRating = 'E_HIGH';
      descriptors.push('모든 연령에 적합');
    }

    // 추가 디스크립터
    if (gamblingScore >= 8) descriptors.push('실제 도박');
    else if (gamblingScore >= 4) descriptors.push('모의 도박');
    
    if (gamblingScore >= 2 || categoryScores.online?.score >= 2) {
      descriptors.push('인앱 구매');
    }
    
    if (categoryScores.online?.score >= 3) {
      descriptors.push('온라인 상호작용');
    }

    return { 
      rating: highestRating, 
      descriptors: [...new Set(descriptors)],
      categoryScores 
    };
  };

  const getRatingDisplay = (rating) => {
    const displays = {
      'E_LOW': { name: 'E', subtitle: '(낮음)', color: 'bg-green-600', description: 'Everyone - 전체 이용가' },
      'E_HIGH': { name: 'E', subtitle: '(높음)', color: 'bg-green-600', description: 'Everyone - 전체 이용가' },
      'E10_LOW': { name: 'E10+', subtitle: '(낮음)', color: 'bg-green-500', description: 'Everyone 10+ - 10세 이상' },
      'E10_HIGH': { name: 'E10+', subtitle: '(높음)', color: 'bg-green-500', description: 'Everyone 10+ - 10세 이상' },
      'T_LOW': { name: 'T', subtitle: '(낮음)', color: 'bg-yellow-500', description: 'Teen - 13세 이상' },
      'T_MEDIUM': { name: 'T', subtitle: '(중간)', color: 'bg-yellow-500', description: 'Teen - 13세 이상' },
      'T_HIGH': { name: 'T', subtitle: '(높음)', color: 'bg-yellow-500', description: 'Teen - 13세 이상' },
      'M_LOW': { name: 'M', subtitle: '(낮음)', color: 'bg-red-600', description: 'Mature 17+ - 17세 이상' },
      'M_MEDIUM': { name: 'M', subtitle: '(중간)', color: 'bg-red-600', description: 'Mature 17+ - 17세 이상' },
      'M_HIGH': { name: 'M', subtitle: '(높음)', color: 'bg-red-600', description: 'Mature 17+ - 17세 이상' },
      'AO': { name: 'AO', subtitle: '', color: 'bg-black', description: 'Adults Only - 성인 전용 (18세 이상)' }
    };
    return displays[rating] || displays['E_HIGH'];
  };

  const currentCategory = questions[currentStep]?.category;
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    const result = calculateRating();
    const ratingInfo = getRatingDisplay(result.rating);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">등급 판정 완료</h1>
              <p className="text-gray-600">ESRB 스타일 자가 등급 매기기 결과</p>
            </div>

            <div className="flex flex-col items-center mb-8">
              <div className={`${ratingInfo.color} text-white rounded-lg p-8 mb-4 shadow-xl`}>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{ratingInfo.name}</div>
                  {ratingInfo.subtitle && <div className="text-2xl">{ratingInfo.subtitle}</div>}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">{ratingInfo.description}</div>
            </div>

            {result.descriptors.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">콘텐츠 디스크립터</h2>
                <div className="bg-gray-100 rounded-lg p-6">
                  <ul className="space-y-2">
                    {result.descriptors.map((desc, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">카테고리별 점수</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(result.categoryScores).map(([cat, scores]) => (
                  <div key={cat} className="bg-gray-100 rounded-lg p-4">
                    <div className="font-bold text-gray-800 mb-2">{categoryNames[cat]}</div>
                    <div className="text-sm text-gray-600">
                      일반: {scores.score.toFixed(1)}점 | EDSA: {scores.edsaScore.toFixed(1)}점
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      총점: {scores.total.toFixed(1)}점
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-sm text-blue-800">
                <strong>참고:</strong> 이 등급은 ESRB 스타일의 자가 평가 결과입니다. 
                공식 등급 판정을 위해서는 해당 국가의 등급 기관에 신청하셔야 합니다.
                EDSA(Educational/Documentary/Scientific/Artistic) 맥락이 인정된 콘텐츠는 
                등급이 낮게 산정되었습니다.
              </p>
            </div>

            <button
              onClick={() => {
                setShowResults(false);
                setCurrentStep(0);
                setAnswers({});
                setEdsaContext({});
                setThemeAnswers({});
              }}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold"
            >
              새로운 평가 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 주제 질문 단계
  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
              자가 등급 매기기 프로그램
            </h1>
            <p className="text-center text-gray-600 mb-8">ESRB 스타일 게임 등급 분류 시스템</p>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1단계: 게임 주제 확인</h2>
              <p className="text-sm text-gray-600 mb-4">
                다음 주제 중 게임에 해당하는 것이 있습니까? 
                이러한 주제는 등급에 즉각적인 영향을 미칩니다.
              </p>

              <div className="space-y-4">
                {themeQuestions.map((theme) => (
                  <div key={theme.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-2">{theme.text}</p>
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                          {getRatingDisplay(theme.instantRating).description}
                        </span>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleThemeAnswer(theme.id, 'yes')}
                          className={`px-4 py-2 rounded ${
                            themeAnswers[theme.id] === 'yes'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          예
                        </button>
                        <button
                          onClick={() => handleThemeAnswer(theme.id, 'no')}
                          className={`px-4 py-2 rounded ${
                            themeAnswers[theme.id] === 'no'
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          아니오
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              disabled={Object.keys(themeAnswers).length !== themeQuestions.length}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              다음 단계로 ({Object.keys(themeAnswers).length}/{themeQuestions.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                질문 {currentStep + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-purple-600">
                {categoryNames[currentCategory]}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {currentQuestion.text}
            </h2>

            {currentQuestion.instantRating && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>주의:</strong> 이 질문은 등급에 즉각적인 영향을 미칠 수 있습니다.
                </p>
              </div>
            )}

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => handleAnswer(currentQuestion.id, 'yes')}
                className={`flex-1 py-4 rounded-lg font-bold transition-all ${
                  answers[currentQuestion.id] === 'yes'
                    ? 'bg-red-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                예 (Yes)
              </button>
              <button
                onClick={() => handleAnswer(currentQuestion.id, 'no')}
                className={`flex-1 py-4 rounded-lg font-bold transition-all ${
                  answers[currentQuestion.id] === 'no'
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                아니오 (No)
              </button>
            </div>

            {answers[currentQuestion.id] === 'yes' && currentQuestion.edsaApplicable && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
                <p className="font-bold text-blue-800 mb-2">
                  EDSA 맥락 질문:
                </p>
                <p className="text-sm text-blue-700 mb-3">
                  이 콘텐츠가 <strong>교육적(Educational)</strong>, <strong>다큐멘터리적(Documentary)</strong>, 
                  <strong>과학적(Scientific)</strong>, 또는 <strong>예술적(Artistic)</strong> 맥락에서 
                  사용됩니까?
                </p>
                <p className="text-xs text-blue-600 mb-3">
                  예: 의료 시뮬레이션의 수술 장면, 역사 교육용 전쟁 재현, 과학 다큐멘터리의 해부학적 표현 등
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdsaAnswer(currentQuestion.id, 'yes')}
                    className={`flex-1 py-2 px-4 rounded ${
                      edsaContext[currentQuestion.id] === 'yes'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-700 border border-blue-300'
                    }`}
                  >
                    예, EDSA 맥락입니다
                  </button>
                  <button
                    onClick={() => handleEdsaAnswer(currentQuestion.id, 'no')}
                    className={`flex-1 py-2 px-4 rounded ${
                      edsaContext[currentQuestion.id] === 'no'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-700 border border-blue-300'
                    }`}
                  >
                    아니오
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentStep(Math.max(-1, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
              이전
            </button>

            {currentStep < questions.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!answers[currentQuestion.id]}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                다음
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={() => setShowResults(true)}
                disabled={!answers[currentQuestion.id]}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                등급 확인하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESRBRatingSystem;