export interface IPaginated<PageT> {
    /**
     * is disable pagination
     */
    'x-disable-pagination': boolean

    /**
     * boolean indicating if pagination is being used for the request
     */
    'x-paginated': boolean

    /**
     * number of results per page
     */
    'x-paginated-by': number

    /**
     * total number of results
     */
    'x-pagination-count': number

    /**
     * current page
     */
    'x-pagination-current': PageT

    /**
     * next results
     */
    'x-pagination-next': Array<PageT>

    /**
     * previous results
     */
    'x-pagination-prev': Array<PageT>
}
