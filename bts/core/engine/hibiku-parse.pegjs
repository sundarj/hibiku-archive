start
  = template:template { return template }

template = 
  t:(open tokens close "\n"?)+ { return t; }

open = '(('
close = '))'

tokens = tokens:[^()]+ { return {token: tokens.join('')} }