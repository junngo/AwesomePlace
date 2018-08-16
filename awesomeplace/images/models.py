from django.db import models
from awesomeplace.users import models as user_models

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.PROTECT)

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)


class Comment(TimeStampedModel):

    """ Comment Model """

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.PROTECT)
    image = models.ForeignKey(Image, 
                            null=True,
                            related_name = 'comments',
                            on_delete=models.PROTECT)

    def __str__(self):
        return self.message


class Like(TimeStampedModel):

    """ Like Model """

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.PROTECT)
    image = models.ForeignKey(Image,
                            null=True,
                            related_name='likes',
                            on_delete=models.PROTECT)

    def __str__(self):
        return 'User:{} - Image:{}'.format(self.creator.username, self.image.caption)
