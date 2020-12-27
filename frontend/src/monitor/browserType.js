export default function BrowserType() {
	const ua = navigator.userAgent.toLowerCase();
	const testUa = regexp => regexp.test(ua);
	const testVs = regexp => ua.match(regexp)
		.toString()
		.replace(/[^0-9|_.]/g, "")
		.replace(/_/g, ".");
	// 系统
	let os = "unknow";
	if (testUa(/windows|win32|win64|wow32|wow64/g)) {
		os = "windows"; // windows系统
	} else if (testUa(/macintosh|macintel/g)) {
		os = "macos"; // macos系统
	} else if (testUa(/x11/g)) {
		os = "linux"; // linux系统
	} else if (testUa(/android|adr/g)) {
		os = "android"; // android系统
	} else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
		os = "ios"; // ios系统
	}
	// 平台
	let deviceName = "unknow";
	if (os === "windows" || os === "macos" || os === "linux") {
		deviceName = "pc"; // PC端
	} else if (os === "android" || os === "ios" || testUa(/mobile/g)) {
		deviceName = "mobile"; // 移动端
	}
	// 内核和载体
	let browserName = "unknow";
	if (testUa(/applewebkit/g)) {
		if (testUa(/edge/g)) {
			browserName = "edge"; // edge浏览器
		} else if (testUa(/opr/g)) {
			browserName = "opera"; // opera浏览器
		} else if (testUa(/chrome/g)) {
			browserName = "chrome"; // chrome浏览器
		} else if (testUa(/safari/g)) {
			browserName = "safari"; // safari浏览器
		}
	} else if (testUa(/gecko/g) && testUa(/firefox/g)) {
		browserName = "firefox"; // firefox浏览器
	} else if (testUa(/presto/g)) {
		browserName = "opera"; // opera浏览器
	} else if (testUa(/trident|compatible|msie/g)) {
		browserName = "iexplore"; // iexplore浏览器
	}
	// 载体版本
	let browserVersion = "unknow";
	if (browserName === "chrome") {
		browserVersion = testVs(/chrome\/[\d._]+/g);
	} else if (browserName === "safari") {
		browserVersion = testVs(/version\/[\d._]+/g);
	} else if (browserName === "firefox") {
		browserVersion = testVs(/firefox\/[\d._]+/g);
	} else if (browserName === "opera") {
		browserVersion = testVs(/opr\/[\d._]+/g);
	} else if (browserName === "iexplore") {
		browserVersion = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
	} else if (browserName === "edge") {
		browserVersion = testVs(/edge\/[\d._]+/g);
  }
  const { cip, cname } = window.returnCitySN
  return {
		deviceName,
		browserName,
		browserVersion,
		os,
    monitorIp: cip,
    country: cname,
    browserInfo: navigator.userAgent
	}
}