# Generated by Django 3.2.9 on 2022-05-12 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_customuser_pfp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='pfp',
            field=models.ImageField(null=True, upload_to='C:/Users/Admin/Pictures/koffie.jpg'),
        ),
    ]
