// Название версии (папка, где будут лежать скрипты и стили Сайта)
var siteVersion = '4.43.6';

// Название версии (папка, где будут лежать скрипты и стили Шапки и Футера)
var headerVersion = '6.5.2';

// Название версии (папка, где будут лежать скрипты и стили для Регистрации)
var registrationVersion = '1.1.15';

// Название версии (папка, где будут лежать скрипты и стили для Виджета Контента)
var contentWidgetVersion = '1.1.2';

// Название версии (папка, где будут лежать скрипты и стили для LandingForHWC)
var landingForHWCVersion = '1.0.12';

// Название версии (папка, где будут лежать скрипты и стили для clickStream)
var clickStreamVersion = '1.2.1';

// Название версии (папка, где будут лежать скрипты и стили для rouletteDota)
var rouletteDotaVersion = '1.0.6';

// Название версии (папка, где будут лежать скрипты и стили для страниц идентификации Госуслуг)
var gosIdentVersion = "1.0.3";

// Название версии (папка, где будут лежать скрипты и стили для VIP-промо)
var vipPromoVersion = '1.1.1';

// Название версии (папка, где будут лежать скрипты и стили для Результатов)
var resultsVersion = '1.0.19';

// Название версии (папка, где будут лежать скрипты и стили для Фрейма регистрации)
var registrationFrameVersion = '1.6.40';

// Название версии (папка, где будут лежать скрипты и стили для Фрейма регистрации)
var identFrameVersion = '1.5.9';

var contentVersion = '1.0.3';

// Название версии (папка, где будут лежать скрипты и стили для GetApps)
var getAppsVersion = '1.1.1';

// Название версии (папка, где будут лежать скрипты и стили для prepareProcessDevRun)
var prepareProcessDevRunVersion = '1.0.0';

// Название версии (папка, где будут лежать скрипты и стили для Универсального Виджета Регистрации)
var registrationWidgetVersion = '1.10.4';

// Название версии (папка, где будут лежать скрипты и стили для Лендинга VIP-статус)
var vipStatusLandingVersion = '1.0.13';

// Название версии (папка, где будут лежать скрипты и стили для Страницы отписки)
var unsubscribePageVersion = '1.0.4';

// Название версии (папка, где будут лежать скрипты и стили для email Web view)
var mailingWebViewVersion = '1.0.2';

// Название версии (папка, где будут лежать скрипты и стили для платежного виджета-ЦУПИС)
var paymentCupisFrameVersion = '1.1.2';

// Название версии (папка, где будут лежать скрипты и стили для Фрейма видеоидентификации)
var videoIdentFrameVersion = '1.3.11';

// Версия фрейма статистики матчей
var statisticsFrameVersion = '1.4.1';
// Версия фрейма статистики матчей (моб)
var statisticsFrameMobileVersion = '1.4.1';

// Название версии (папка, где будут лежать скрипты и стили для Лотереи)
var lotteryFrameVersion = '1.0.8';

// Версия фрейма капчи
var captchaFrameVersion = '1.0.0';

// Алиас сайта
var siteAlias = 'red5000';

var landingForHWCConfig = {
	configPath: './'
};

var urlsConfig = {
	// Адрес CDN для подключения статики
	cdnUrl: "//origin.bk6bba-resources.com",

	// Путь к скрипту по загрузке статики
	loader: "webStaticRed/fon/loader.clickStream.3.min.js",

	// Путь к скрипту по загрузке чата
	chatLoader: "webStaticRed/fon/chat.loader.2.js",

	// Путь к скрипту по загрузке статики для GetApps
	getAppsLoader: "webStaticRed/getApps/loader.min.js",
	// Путь к папке со статикой для GetApps (на CDN)
	getAppsPath: 'webStaticRed/getApps',

	// Путь к скрипту по загрузке статики для Фрейма капчи
	captchaFrameLoader: "webStaticRed/captcha/loader.captcha.min.js",
	// Путь к папке со статикой для Фрейма капчи (на CDN)
	captchaFramePath: 'webStaticRed/captcha',

	// Путь к скрипту по загрузке аналитики
	analyticsLoader: "webStaticRed/fon/analytics.loader.js?v=3",

	// Путь к скрипту по загрузке статики для Регистрации
	registrationLoader: "webStaticRed/registration/loader.clickStream.min.js",

	// Путь к скрипту по загрузке статики
	registrationFrameLoader: "webStaticRed/registrationFrame/loader.registration.min.js",
	// Путь к папке со статикой для Фрейма регистрации (на CDN)
	registrationFramePath: 'webStaticRed/registrationFrame',
	// Путь к скрипту по загрузке статики для Фрейма идентификации
	identFrameLoader: "webStaticRed/identFrame/loader.ident.min.js?ver=1",
	// Путь к папке со статикой для Фрейма идентификации (на CDN)
	identFramePath: 'webStaticRed/identFrame',
	// Путь к скрипту по загрузке статики для Фрейма видеоидентификации
	videoIdentFrameLoader: "webStaticRed/videoIdentFrame/loader.videoIdent.min.js",
	// Путь к папке со статикой для Фрейма видеоидентификации (на CDN)
	videoIdentFramePath: 'webStaticRed/videoIdentFrame',

	// Путь к скрипту по загрузке статики для Универсального Виджета Регистрации
	registrationWidgetLoader: "webStaticRed/registrationWidget/loader.min.js",
	// Путь к папке со статикой для Универсального Виджета Регистрации (на CDN)
	registrationWidgetPath: 'webStaticRed/registrationWidget',

	// Путь к скрипту по загрузке статики для Фрейма статистики
	statisticsFrameLoader: "webStaticCommon/statisticsFrame/loader.min.js",
	// Путь к папке со статикой для Фрейма статистики (на CDN)
	statisticsFramePath: 'webStaticCommon/statisticsFrame',
	// Путь к скрипту по загрузке статики для Фрейма статистики (моб)
	statisticsFrameMobileLoader: "webStaticCommon/statisticsFrameMobile/loader.mobile.min.js",
	// Путь к папке со статикой для Фрейма статистики (моб) (на CDN)
	statisticsFrameMobilePath: 'webStaticCommon/statisticsFrameMobile',

	// prepareProcessDevRun
	prepareProcessDevRunLoader: 'webStaticCommon/prepareProcessDevRun/loader.min.js',
	prepareProcessDevRunPath: 'webStaticCommon/prepareProcessDevRun',

	// Путь к скрипту по загрузке статики для Страницы отписки
	unsubscribePageLoader: "webStaticRed/unsubscribePage/loader.min.js",
	// Путь к папке со статикой для Регистрации (на CDN)
	unsubscribePagePath: 'webStaticRed/unsubscribePage',

	// Путь к скрипту по загрузке статики для email Web view
	mailingWebViewLoader: "webStaticCommon/mailingWebViewPage/loader.min.js",
	// Путь к папке со статикой для email Web view (на CDN)
	mailingWebViewPath: 'webStaticCommon/mailingWebViewPage',

	// Путь к скрипту по загрузке статики для Лендинга VIP-статус
	vipStatusLandingLoader: "webStaticRed/loyalty/vipStatusLanding/loader.min.js",
	// Путь к папке со статикой для Лендинга VIP-статус (на CDN)
	vipStatusLandingPath: 'webStaticRed/loyalty/vipStatusLanding',

	// Путь к скрипту по загрузке статики для Регистрации
	contentWidgetLoader: "webStaticRed/contentWidget/loader.min.js",

	// Путь к скрипту по загрузке статики для Кликстрима
	clickStreamLoader: "webStaticRed/clickStream/loader.min.js",

	// Путь к скрипту по загрузке статики виджета-ЦУПИС
	paymentCupisLoader: "webStaticRed/paymentCupisFrame/loader.min.js",
	// Путь к папке со статикой виджета-ЦУПИС
	paymentCupisFramePath: 'webStaticRed/paymentCupisFrame',

	// Путь к скрипту по загрузке статики для VIP-промо
	vipPromoLoader: "webStaticRed/loyalty/vipPromo/loader.min.js",

	// Путь к скрипту по загрузке статики для Результатов
	resultsLoader: "webStaticRed/results/loader.min.js",

	// Путь к папке со статикой для Шапки и Футера (на CDN)
	headerPath: "webStaticRed/header",

	// Путь к папке со статикой для Сайта (на CDN)
	webSitePath: "webStaticRed/fon",

	// Путь к папке со статикой для Личного кабинета (на CDN)
	accountPath: "webStaticRed/account",

	// Путь к папке со статикой для Клубов (на CDN)
	clubsPath: "webStaticRed/clubs",

	// Путь к папке со статикой для Статистики (на CDN)
	statsPath: "webStaticRed/stats",

	// Путь к папке со статикой для Инфо-сервиса
	// superexpressPath: "webStaticRed/superexpress-info",

	// Путь к папке со статикой для Конструктора (на CDN)
	playerPropsPath: 'webStaticRed/player-props',

	// Путь к папке со статикой для Киберспорта (на CDN)
	esportRedPath: 'webStaticRed/esport',
	esportEmbedPath: 'webStaticRed/esport',

	// Путь к папке со статикой для Регистрации (на CDN)
	registrationPath: 'webStaticRed/registration',

	// Путь к папке со статикой для Виджета Контента (на CDN)
	contentWidgetPath: 'webStaticRed/contentWidget',

	// Путь к скрипту по загрузке статики для LandingForHWC
	landingForHWCLoader: "webStaticRed/landings/iihf2019/loader.min.js",

	// Путь к папке со статикой для LandingForHWC (на CDN)
	landingForHWC: 'webStaticRed/landings/iihf2019',

	// Путь к папке со статикой для clickStream (на CDN)
	clickStreamPath: 'webStaticRed/clickStream',

	// Путь к скрипту по загрузке статики для rouletteDota
	rouletteDotaLoader: "webStaticRed/landings/rouletteDota/loader.min.js",

	// Путь к папке со статикой для RouletteDota (на CDN)
	rouletteDota: 'webStaticRed/landings/rouletteDota',

	// Путь к папке со статикой для GosIdent (на CDN)
	gosIdentPath: 'webStaticRed/gosIdent',

	// Путь к скрипту по загрузке статики для GosIdent
	gosidentLoader: "webStaticRed/gosIdent/loader.min.js",

	// Путь к папке со статикой для Результатов (на CDN)
	resultsPath: 'webStaticRed/results',

	landings: {
		specialOffer: "/webStaticCommon/landings/specialOffer"
	},

	// Путь к папке со статикой для VIP-промо (на CDN)
	vipPromoPath: 'webStaticRed/loyalty/vipPromo',

	loyalty: {
		banners: {
			desktop: {
				beFirst: '/webStaticCommon/loyalty/desktop/banners/beFirst',
				betBattle: '/webStaticCommon/loyalty/desktop/banners/betBattle',
				betCounter: '/webStaticCommon/loyalty/desktop/banners/betCounter',
				rouletteSe: '/webStaticCommon/loyalty/desktop/banners/rouletteSe'
			},
			mobile: {
				beFirst: '/webStaticCommon/loyalty/mobile/banners/beFirst',
				betBattle: '/webStaticCommon/loyalty/mobile/banners/betBattle',
				betCounter: '/webStaticCommon/loyalty/mobile/banners/betCounter',
				rouletteSe: '/webStaticCommon/loyalty/mobile/banners/rouletteSe'
			},
			stakemat: {
				beFirst: '/webStaticCommon/loyalty/stakemat/banners/beFirst',
				betBattle: '/webStaticCommon/loyalty/stakemat/banners/betBattle',
				betCounter: '/webStaticCommon/loyalty/stakemat/banners/betCounter',
				rouletteSe: '/webStaticCommon/loyalty/stakemat/banners/rouletteSe'
			},
			universal: {
				debugView: '/webStaticCommon/loyalty/universal/banners/debugView'
			}
		}
	},

	// Путь к папке со статикой для announcement (на CDN)
	announcement: 'webStaticCommon/loyalty/universal/landings/announcement',

	// Путь к скрипту по загрузке статики для announcement
	announcementLoader: 'webStaticCommon/loyalty/universal/landings/announcement/loader.min.js',

	// Путь к папке со статикой для beFirst (на CDN)
	beFirst: 'webStaticCommon/loyalty/universal/landings/beFirst',

	// Путь к скрипту по загрузке статики для beFirst
	beFirstLoader: 'webStaticCommon/loyalty/universal/landings/beFirst/loader.min.js',

	// Путь к папке со статикой для betBattleSe (на CDN)
	betBattleSe: 'webStaticCommon/loyalty/universal/landings/betBattleSe',

	// Путь к скрипту по загрузке статики для betBattleSe
	betBattleSeLoader: 'webStaticCommon/loyalty/universal/landings/betBattleSe/loader.min.js',

	// Путь к папке со статикой для betCounter (на CDN)
	betCounter: 'webStaticCommon/loyalty/universal/landings/betCounter',

	// Путь к скрипту по загрузке статики для betCounter
	betCounterLoader: 'webStaticCommon/loyalty/universal/landings/betCounter/loader.min.js',

	// Путь к папке со статикой для betTimer2d (на CDN)
	betTimer2d: 'webStaticCommon/loyalty/universal/landings/betTimer2d',

	// Путь к скрипту по загрузке статики для betTimer2d
	betTimer2dLoader: 'webStaticCommon/loyalty/universal/landings/betTimer2d/loader.min.js',

	// Путь к папке со статикой для betTimerLuckyNumber (на CDN)
	betTimerLuckyNumber: 'webStaticCommon/loyalty/universal/landings/betTimerLuckyNumber',

	// Путь к скрипту по загрузке статики для betTimerLuckyNumber
	betTimerLuckyNumberLoader: 'webStaticCommon/loyalty/universal/landings/betTimerLuckyNumber/loader.min.js',

	// Путь к папке со статикой для cashBack (на CDN)
	cashBack: 'webStaticCommon/loyalty/universal/landings/cashBack',

	// Путь к скрипту по загрузке статики для cashBack
	cashBackLoader: 'webStaticCommon/loyalty/universal/landings/cashBack/loader.min.js',

	// Путь к папке со статикой для lostAmountCashBackByPromoCodeSe (на CDN)
	lostAmountCashBackByPromoCodeSe: 'webStaticCommon/loyalty/universal/landings/lostAmountCashBackByPromoCodeSe',

	// Путь к скрипту по загрузке статики для lostAmountCashBackByPromoCodeSe
	lostAmountCashBackByPromoCodeSeLoader: 'webStaticCommon/loyalty/universal/landings/lostAmountCashBackByPromoCodeSe/loader.min.js',

	// Путь к папке со статикой для roulette2d (на CDN)
	roulette2d: 'webStaticCommon/loyalty/universal/landings/roulette2d',

	// Путь к скрипту по загрузке статики для roulette2d
	roulette2dLoader: 'webStaticCommon/loyalty/universal/landings/roulette2d/loader.min.js',

	// Путь к папке со статикой для rouletteSe (на CDN)
	rouletteSe: 'webStaticCommon/loyalty/universal/landings/rouletteSe',

	// Путь к скрипту по загрузке статики для rouletteSe
	rouletteSeLoader: 'webStaticCommon/loyalty/universal/landings/rouletteSe/loader.min.js',

	// Путь к скрипту по загрузке статики для Лотереи
	lotteryLoader: 'webStaticRed/lotteryFrame/loader.min.js',

	// Путь к папке со статикой для Лотереи (на CDN)
	lotteryFramePath: 'webStaticRed/lotteryFrame'
};

// Название версии (папка, где будут лежать скрипты и стили для announcement)
var announcementVersion = '1.0.3';

// Название версии (папка, где будут лежать скрипты и стили для beFirst)
var beFirstVersion = '1.2.11';

// Название версии (папка, где будут лежать скрипты и стили для betBattleSe)
var betBattleSeVersion = '1.1.13';

// Название версии (папка, где будут лежать скрипты и стили для betCounter)
var betCounterVersion = '1.0.2';

// Название версии (папка, где будут лежать скрипты и стили для betTimer2d)
var betTimer2dVersion = '1.0.4';

// Название версии (папка, где будут лежать скрипты и стили для betTimerLuckyNumber)
var betTimerLuckyNumberVersion = '1.2.59';

// Название версии (папка, где будут лежать скрипты и стили для cashBack)
var cashBackVersion = '1.0.17';

// Название версии (папка, где будут лежать скрипты и стили для lostAmountCashBackByPromoCodeSe)
var lostAmountCashBackByPromoCodeSeVersion = '1.1.2';

// Название версии (папка, где будут лежать скрипты и стили для roulette2d)
var roulette2dVersion = '1.0.1';

// Название версии (папка, где будут лежать скрипты и стили для rouletteSe)
var rouletteSeVersion = '1.0.2';
