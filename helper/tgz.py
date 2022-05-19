import os, tarfile

#一次性打包整个根目录。空子目录会被打包。
#如果只打包不压缩，将"w:gz"参数改为"w:"或"w"即可。

def make_targz(output_filename:str, source_dir:str,):
  '''一次性打包空子目录会被打包。

  如果只打包不压缩，将"w:gz"参数改为"w:"或"w"即可。'''
  with tarfile.open(output_filename,'w:gz') as tar:
    tar.add(source_dir, arcname=os.path.basename(source_dir))
    tar.close()
