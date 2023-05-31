import { TicketEventAssetId } from "../entities/event";

interface Props {
  items: TicketEventAssetId[];
  currentPage: number;
}

export const filterItemsForPage = (props: Props) => {
  const splicedItems = props.items.splice((props.currentPage - 1) * 5, 5);
  return splicedItems;
};
