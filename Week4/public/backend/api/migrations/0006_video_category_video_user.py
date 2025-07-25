# Generated by Django 5.2.4 on 2025-07-09 12:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_like_created_at'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='category',
            field=models.CharField(choices=[('music', 'Music'), ('sports', 'Sports'), ('news', 'News'), ('entertainment', 'Entertainment'), ('education', 'Education'), ('other', 'Other')], default='other', max_length=20),
        ),
        migrations.AddField(
            model_name='video',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
