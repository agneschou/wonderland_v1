import { routes } from '@/lib/routes';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { KEY_MAP } from './config';
import { i18nConfig } from './i18n/i18nConfig';
import createMiddleware from 'next-intl/middleware';

function getLocale(headers: Headers): string | undefined {
	const negotiatorHeaders = Object.fromEntries(headers.entries());
	// @ts-ignore locales are readonly
	const locales: string[] = i18nConfig.locales;

	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

	const locale = matchLocale(languages, locales, i18nConfig.defaultLocale);

	return locale;
}

function isLoginPage(pathname: string) {
	return pathname.includes(routes.login);
}
function isChangePasswordPage(pathname: string) {
	return pathname.includes(routes.changePassword);
}

function redirectToLogin(locale: string, url: string) {
	return NextResponse.redirect(new URL(`/${locale + routes.login}`, url));
}

function redirectToHome(locale: string, url: string) {
	return NextResponse.redirect(new URL(`/${locale + routes.home}`, url));
}
function redirectToChangePassword(locale: string, url: string) {
	return NextResponse.redirect(new URL(`/${locale + routes.changePassword}`, url));
}

function redirectToLocale(locale: string, pathname: string, url: string) {
	return NextResponse.redirect(new URL(`/${locale + pathname}`, url));
}

export const i18nMiddleware = createMiddleware(i18nConfig);
export async function middleware(request: NextRequest) {
	const {
		nextUrl: { pathname },
		headers,
		url,
		cookies,
	} = request;
	const currentLocal = i18nConfig.locales.find((locale) => pathname.split('/')[1] === locale);
	const authToken = !!cookies.get(KEY_MAP.authToken)?.value;
	const isFirstLogin = cookies.get(KEY_MAP.isFirstLogin)?.value === 'true';
	const locale = currentLocal || getLocale(headers) || i18nConfig.defaultLocale;
	console.log(!!authToken, pathname);

	const newRequest = new NextRequest(request);

	if (!authToken && !isLoginPage(pathname)) {
		newRequest.nextUrl.pathname = routes.login;
		// return redirectToLogin(locale, url);
	} else if (authToken && isFirstLogin && !isChangePasswordPage(pathname)) {
		newRequest.nextUrl.pathname = routes.changePassword;
		// return redirectToChangePassword(locale, url);
	} else if (authToken && isLoginPage(pathname)) {
		newRequest.nextUrl.pathname = routes.home;
		// return redirectToHome(locale, url);
	}

	// if (!currentLocal) {
	// 	return redirectToLocale(locale, pathname, url);
	// }

	return i18nMiddleware(newRequest);
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg|logo_bg.svg|manifest.json).*)'],
};
