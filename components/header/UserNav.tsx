import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { getI18n } from '@/i18n';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { DropdownLogout } from './DropdownLogout';

export async function UserNav({ lang }: { lang: string }) {
	const langDict = await getI18n(lang);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='https://avatars.githubusercontent.com/u/124599?v=4' alt='@shadcn' />
						<AvatarFallback>SC</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>Agent</p>
						<p className='text-xs leading-none text-muted-foreground'></p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href={`${routes.changePassword}`}>
						<DropdownMenuItem>{langDict.changePassword.title}</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownLogout lang={lang}>{langDict.ui.logout}</DropdownLogout>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
