# Generated by Django 3.2.9 on 2022-03-10 15:24

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0005_alter_versecomments_comment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='versecomments',
            name='comment_date',
            field=models.DateTimeField(default=datetime.datetime(2022, 3, 10, 17, 24, 15, 960719)),
        ),
    ]
