
from api.models import product
import csv


def run():
    with open('api/data.csv' , encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        product.objects.all().delete() # this w

        objs = []
        for row in reader:

            # print(type(row[4]))
            # pass
            pr = product(product_uid=row[0],product_title=row[1] ,product_img_url = row[2] ,product_description = row[4] , product_price = row[3] )
            objs.append(pr)
        # optimize above code for bulk insert
        product.objects.bulk_create(objs)
        print("Done")
