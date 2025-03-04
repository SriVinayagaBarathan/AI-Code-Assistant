from model import predict
from prompt_maker import code_completion_correction,next_level

# print(predict("Hello"))

ini="""
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

"""



# print(predict(code_completion_correction(ini)))

print(predict(next_level(ini)))