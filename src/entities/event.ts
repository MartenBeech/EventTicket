export interface TicketEvent {
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  description: string;
  price: number;
  creatorName: string;
}

export interface TicketEventAssetId {
  ticketEvent: TicketEvent;
  assetId: number;
}
