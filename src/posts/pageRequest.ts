export class PageRequest {
	getOffset(page: number): number {
		if (page === 0) {
			return 0;
		}
		return page * 12;
	}
}
