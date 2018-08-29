from django.db import models
from awesomeplace.users import models as user_models
from awesomeplace.images import models as image_models

# Create your models here.

class Notification(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('follow', 'Follow')
    )

    creator = models.ForeignKey(user_models.User
                            , related_name='creator'
                            , on_delete=models.PROTECT)
    to = models.ForeignKey(user_models.User
                            , related_name='to'
                            , on_delete=models.PROTECT)
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image
                            , on_delete=models.PROTECT
                            , null=True
                            , blank=True)
