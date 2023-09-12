const ENV = process.env.NEXT_PUBLIC_ENV || 'development';
export const IS_DEV = false && ENV === 'development';

const DOMAINS: { [key: string]: string } = {
	development: 'http://u2f9u0ze6peftv.funkytest.com',
	uat: 'http://u2f9u0ze6peftv.funkytest.com',
	prod: '',
};
const API_LIST: { [key: string]: string } = {
	...DOMAINS,
	development: '',
};
const SVC_LIST: { [key: string]: string } = {
	development: 'http://u2f9u0ze6peftv.funkytest.com',
	uat: 'http://agent-authz-svc',
	prod: 'http://agent-authz-svc',
};
const PREFIX = '/agent/api';

export const BASE_URL = DOMAINS[ENV];
export const API_URL = API_LIST[ENV] + PREFIX;
export const SERVER_API_URL = SVC_LIST[ENV] + PREFIX;

export const KEY_MAP = {
	authToken: 'authToken',
	isFirstLogin: 'isFirstLogin',
	url: 'url',
};

export const ALL = 'All';
export const createDistributionExample = 'https://storage.googleapis.com/wonderland_agentsite_img/example.csv';
