from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import user , product

from django.http import HttpResponse

from .serializers import userSerializer , productSerializer
import setup as mlt


# Create your views here.

@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': 'api/create-user/?age=[users age]&gender=[users gender]',
            'method': 'GET',
            'body': None,
            'description': 'Returns a newly created user id . Should be called if id is not present in the local storage.Pass the age and gender as args'
        },
        {
            'Endpoint': '/api/add-search-data/',
            'method': 'POST',
            'body': {'userId': "Enter the user id here" , 'q': "Enter the search term here"},
            'description': 'Add Search Interaction to DB for processing'
        },
        {
            'Endpoint': '/api/add-cart-data/',
            'method': 'POST',
            'body': {'userId': "Enter the user id here" , 'q': "Enter the product id here"},
            'description': 'Add Cart Interaction to DB for processing'

        },
        {
            'Endpoint': '/api/recommended/?q=userId',
            'method': 'GET',
            'body': None,
            'description': 'Get recommendations for home page and/or search query page. MAKE SURE TO PASS THE userId as a query param '
        },
        {
            'Endpoint': '/api/search/?q=querystring',
            'method': 'GET',
            'body': None,
            'description': 'Vanilla Search Results based on string matching. MAKE SURE TO PASS THE query typed in search box as a query param '
        },

    ]
    return Response(routes)

@api_view(['GET'])
def createUser(request):

    age = request.GET.get("age")
    gender = request.GET.get("gender")

    print(age , gender)
    a = user(name = "test" , age = age , gender = gender)
    a.save()
    new_user = {
        'id': a.id,
        'age':int(age),
        'sex':gender
    }
    print(new_user,new_user['id'])
    mlt.add_user(new_user)
    serializer = userSerializer(a)
    return Response(serializer.data)


@api_view(['POST'])
def addSearchData(request ):

    data = request.data

    user_id = int(data['userId'])
    search_term = data['q']
    print("The user id" , user_id)

    curr = user.objects.filter(id = user_id)

    curr_queries = curr[0].search_queries

    user.objects.filter(id = user_id).update(search_queries  = curr_queries + "," + search_term )

    return HttpResponse("Done")


@api_view(['POST'])
def addCartData(request):

    data = request.data

    user_id = int(data['userId'])

    item_id = data['q']

    curr_user = user.objects.filter(id = user_id)
    curr_items = curr_user[0].cart_items
    rating = 1;
    for x in curr_items.split(','):
        if x == item_id:
            rating += 1
    user_obj = {
        'id': int(user_id),
        'age': user.age,
        'sex': str(user.gender).upper() # ??
    }
    mlt.update_user(user_obj, int(item_id), rating)
    print(user_obj, item_id, rating)
    try:                        
        curr_item = product.objects.filter(product_uid = str(item_id))
        prev = curr_item[0].users_interested
        product.objects.filter(product_uid = str(item_id)).update(users_interested = prev+1)
    except:
        print("expected Exception")

    user.objects.filter(id = user_id).update(cart_items  = curr_items + "," + str(item_id) )
    return HttpResponse("Done")

def get_items_from_ids(item_ids,user_cart="",limit=20):
    items = []
    for item_id in item_ids:
        if str(item_id) in user_cart: continue
        try:
            items.append(product.objects.filter(product_uid = item_id)[0])
        except:
            print("expected Exception")
    return items[:limit]
@api_view(['GET'])
def recommend(request , userId):
    item_ids = mlt.recommend(int(userId))
    # map to product objects
    items = get_items_from_ids(item_ids,user.objects.filter(id = userId)[0].cart_items)
    return Response(productSerializer(items , many = True).data)
@api_view(['GET'])
def search(request ):

    query = request.GET.get('q')
    item_ids = mlt.get_recommendation(query)
    items = get_items_from_ids(item_ids)
    # print("got req for search" , query,items)
    return Response(productSerializer(items , many = True).data)












