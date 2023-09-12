import { ScrollArea } from '@/components/ui/ScrollArea';
import { getSidebarGroup } from '@/lib/getSidebarGroup';
import { cn } from '@/lib/utils';
import { NavButton } from './NavButton';

export async function Sidebar({ sidebarGroup }: { sidebarGroup: ReturnType<typeof getSidebarGroup> }) {
	return (
		<div className={cn('pb-12')}>
			<div className='space-y-4 py-4'>
				{sidebarGroup.map(({ label, list }) => (
					<div className='px-3 py-2' key={label}>
						<h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>{label}</h2>
						<ScrollArea className={`h-[${Math.min(300, list.length * 44 - 4)}px]`}>
							<div className='space-y-1'>
								{list.map((item) => (
									<NavButton key={item.label} {...item} path={item.path} />
								))}
							</div>
						</ScrollArea>
					</div>
				))}
			</div>
		</div>
	);
}
