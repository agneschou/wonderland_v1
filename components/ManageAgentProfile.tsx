'use client';
import { ImageUploadInput2 } from '@/components/ui/ImageUploadInput2';
import { replacePlaceholder } from '@/i18n/replacePlaceholder';
import { AlertDestruction } from '@/components/ui/AlertDestruction';
import { useParams } from 'next/navigation';
import { updateProfileImg, getProfileInfo } from '@/lib/serverAction';
import { useState, useTransition, useEffect } from 'react';
import { routes } from '@/lib/routes';
import Link from 'next/link';

interface IManageAgentProfileProps {
	dict: {
		inputErrorMessage: {
			fileSizeLessThanKB: string;
			imageWidthEqualPx: string;
			imageHeightEqualPx: string;
		};
		changePassword: {
			title: string;
			description: string;
			oldPassword: {
				label: string;
				placeholder: string;
				description: string;
			};
			newPassword: {
				label: string;
				placeholder: string;
				description: string;
			};
			button: string;
		};
		language: {
			title: string;
			hint: string;
			input: any;
		};
	};
	profileInfo:{
		agentId:string;
		agentName:string;
		streamerLogoURL:string;
		agentLogoUrl:string;
	}
}

export type IGetProfileImageSchemaInput = {
	agentId: '';
};
export type IUpdateProfileImageSchemaInput = {
	imageFile1: File | null;
	imageFile2?: File | null;
};

export function ManageAgentProfile({ profileInfo,dict }: IManageAgentProfileProps) {
	const [agentLogo, setSelectedAgentLogo] = useState<File | null>(null);
	const [streamerLogo, setstreamerLogo] = useState<File | null>(null);
	const [agentLogoError, setAgentLogoError] = useState<string | undefined>();
	const [streamerLogoError, setStreamerLogoError] = useState<string | undefined>();
	const [agentLogoURL, setAgentLogoURL] = useState<string | null>(null);
	const [streamerLogoURL, setStreamerLogoURL] = useState<string | null>(null);
	const [isLoading, startTransition] = useTransition();
	const { lang } = useParams() ?? 'en';
	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const data = await getProfileInfo();
				if (data.agentLogoURL) {
					setAgentLogoURL(data.agentLogoURL);
				}
				if (data.streamerLogoURL) {
					setStreamerLogoURL(data.streamerLogoURL);
				}
			} catch (error) {
				console.error('Error fetching profile image:', error);
			}
		};

		fetchProfileImage();
	}, []);

	const handleAgentLogoImageChange = (agentLogoURL: string | null = null) => {
		setAgentLogoURL(agentLogoURL);
		startTransition(async () => {
			await updateProfileImg({
				imageFile1: agentLogo,
				imageFile2: null,
			});
		});
	};

	const handleStreamerLogoImageChange = (streamerLogoURL: string | null = null) => {
		setStreamerLogoURL(streamerLogoURL);
		startTransition(async () => {
			await updateProfileImg({
				imageFile1: null,
				imageFile2: streamerLogo,
			});
		});
	};

	const setAgentLogoInputError = (isError: boolean, message: string) => {
		if (!isError) {
			setAgentLogoError(undefined);
			return true;
		}
		setAgentLogoError(replacePlaceholder(message, 30 * 1024));
		return false;
	};

	const setStreamerLogoInputError = (isError: boolean, message: string) => {
		if (!isError) {
			setStreamerLogoError(undefined);
			return true;
		}
		setStreamerLogoError(replacePlaceholder(message, 30 * 1024));
		return false;
	};

	return (
		<div className='container h-screen overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8 max-w-xl'>
			<h1 className='text-center text-2xl font-bold mb-8'>User Profile</h1>
			<div className='card bg-white border border-gray-300 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-8'>
				<Link href={`${routes.changePassword}`}>
					<button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>Update Password</button>
				</Link>
			</div>
			<div className='card bg-white border border-gray-300 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Agent Logo</h2>
				<p className='mb-4'>Upload your agent logo here. Recommended size: 80x80px.</p>
				<ImageUploadInput2
					accept='image/png, image/jpeg, image/jpg, image/svg'
					onChange={handleAgentLogoImageChange}
					previewImage={profileInfo.agentLogoUrl}
					validateSize={(size) =>
						setAgentLogoInputError(size > 1024 * 30, replacePlaceholder(dict.inputErrorMessage.fileSizeLessThanKB, 30))
					}
					validateHeight={(height) =>
						setAgentLogoInputError(height === 80, replacePlaceholder(dict.inputErrorMessage.imageHeightEqualPx, 80))
					}
					validateWidth={(width) =>
						setAgentLogoInputError(width === 80, replacePlaceholder(dict.inputErrorMessage.imageWidthEqualPx, 80))
					}
				/>
				{agentLogoError && <AlertDestruction title={agentLogoError} />}
			</div>

			<div className='card bg-white border border-gray-300 p-4 sm:p-6 lg:p-8 rounded-lg shadow-md mb-8'>
				<h2 className='text-xl font-semibold mb-4'>Streamer Logo</h2>
				<p className='mb-4'>Upload your streamer logo here. Recommended size: 80x80px.</p>

				<ImageUploadInput2
					accept='image/png, image/jpeg, image/jpg, image/svg'
					onChange={handleStreamerLogoImageChange}
					previewImage={profileInfo.streamerLogoURL}
					validateSize={(size) =>
						setStreamerLogoInputError(
							size > 1024 * 30,
							replacePlaceholder(dict.inputErrorMessage.fileSizeLessThanKB, 30)
						)
					}
					validateHeight={(height) =>
						setStreamerLogoInputError(height === 80, replacePlaceholder(dict.inputErrorMessage.imageHeightEqualPx, 80))
					}
					validateWidth={(width) =>
						setStreamerLogoInputError(width === 80, replacePlaceholder(dict.inputErrorMessage.imageWidthEqualPx, 80))
					}
				/>
				{streamerLogoError && <AlertDestruction title={streamerLogoError} />}
			</div>
		</div>
	);
}
