from add import add as real_add
import sys
import zerorpc
import re

class AddApi(object):
	#api function defintion
	def add(self, a, b):
		"""return sum"""
		try:
			#server side input validation check
			self.validate_number(a)
			self.validate_number(b)
			#call core function
			return real_add(a,b)
		except Exception as e:
			return 0.0
    
	#validation function
	def validate_number(self, num):
		if (re.fullmatch(r'-{0,1}[0-9]{1,}.{0,1}[0-9]{0,}',num)==None):
			print('raising exception')
			raise Exception("Please enter a valid number!")
		return

	def echo(self, text):
		"""echo any text"""
		return text

#set port number
def parse_port():
    port = 4242
    try:
        port = int(sys.argv[1])
    except Exception as e:
        pass
    return '{}'.format(port)

#server side functionality test
def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(AddApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()
