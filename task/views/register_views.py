import logging
import traceback

from django.contrib.auth.hashers import make_password
from django.db import transaction, IntegrityError
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.generic import View

from task.models import User


class LoginView(View):
    """ Login view class """
    def get(self, request):

        return render(request, 'login-page.html')


class RegisterView(View):
    """Register view class"""
    def get(self, request):

        return render(request, 'index.html')

    def post(self, request):
        try:
            self.insert_handler(request)
        except RegisterException as err:
            return JsonResponse({
                'name': err.name,
                'message': str(err)
            }, status=400)
        except IntegrityError as err:
            print(err.args)
            return JsonResponse({
                # 'name': err,
                'message': str(err)
            }, status=400)
        except:
            logging.error(traceback.format_exc())
            return JsonResponse({
                'message': 'Something went wrong'
            }, status=500)

        return JsonResponse({
            'message': 'Success'
        })

    def insert_handler(self, request):
        """
        handle insert to db
        """
        # transaction for rollback
        with transaction.atomic():
            self.check_region(request.POST['phone'])
            self.check_integrity(request)

            # make object for insert
            obj = {
                'email': request.POST['email'],
                'first_name': request.POST['first_name'],
                'last_name': request.POST['last_name'],
                'password': make_password(request.POST['password']),
                'phone_number': request.POST['phone'],
                'birth_date': request.POST['birth'] or None
            }

            # if gender selected update to object

            if 'gender' in request.POST:
                obj.update({'gender': request.POST['gender']})

            # insert object
            User.objects.create(**obj)



    @staticmethod
    def check_region(number):
        """
        raise error if number not started by +62
        """
        if number[:3] == '+62':
            return True

        RegisterException.name = 'phone'

        raise RegisterException('Please enter valid Indonesian phone number')

    @staticmethod
    def check_integrity(request):
        """
        handle Integrity Error for email and phone number
        """
        exist_email = User.objects \
            .filter(email=request.POST['email']) \
            .exists()

        exist_phone = User.objects \
            .filter(phone_number=request.POST['phone']) \
            .exists()

        if exist_email:
            RegisterException.name = 'email'
            raise RegisterException('Email already exist')

        if exist_phone:
            RegisterException.name = 'phone'
            raise RegisterException('Phone number already exist')

        return True

class RegisterException(Exception):
    """
    Exception class
    """
    pass