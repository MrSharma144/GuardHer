import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ReviewConsumer(AsyncWebsocketConsumer):
    GROUP_NAME = 'area_reviews'

    async def connect(self):
        await self.channel_layer.group_add(self.GROUP_NAME, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.GROUP_NAME, self.channel_name)

    # Called when the REST view broadcasts a new review
    async def review_new(self, event):
        await self.send(text_data=json.dumps({
            'type': 'review.new',
            'review': event['review'],
        }))
