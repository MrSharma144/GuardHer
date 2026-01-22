from rest_framework import serializers
from api.models import User
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from api.utils import Util

class UserRegistrationSerializer(serializers.ModelSerializer):
    #  we are writing this becoz we need confirm password field in our Registration API
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email','name','password','password2','tc']
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }

# validate method to check if passwords match
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        return attrs
        

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password'],
            tc=validated_data['tc']
        )
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']  # Add other fields as necessary

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password','password2']
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        user.set_password(password)
        user.save()
        return attrs
    
class sendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            # Here, you would typically generate a password reset token and send an email
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded UID:', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token:', token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Password Reset Link:', link)
            
        # Send Email Logic can be implemented here
            data={
                'subject':'Reset Your Password',
                'email_body':f'Hi, Please use the link below to reset your password \n{link}',
                'to_email':user.email

            }
            Util.send_email(data)
            return attrs

        else:
            raise serializers.ValidationError("You are not a registered user")
        return attrs
    
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    class Meta:
        fields = ['password','password2']
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        uid = self.context.get('uid')
        token = self.context.get('token')
        if password != password2:
            raise serializers.ValidationError("Passwords do not match")
        try:
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("Token is not valid or has expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("Token is not valid or has expired")
        
        return attrs