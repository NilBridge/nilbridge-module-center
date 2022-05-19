import os, tarfile
import gzip

#一次性打包整个根目录。空子目录会被打包。
#如果只打包不压缩，将"w:gz"参数改为"w:"或"w"即可。

def make_targz(output_filename:str, source_dir:str,):
  '''一次性打包空子目录会被打包。

  如果只打包不压缩，将"w:gz"参数改为"w:"或"w"即可。'''
  with tarfile.open(output_filename,'w:gz') as tar:
    tar.add(source_dir, arcname=os.path.basename(source_dir))
    tar.close()

def un_gz(file_name):
    """ungz zip file"""
    f_name = file_name.replace(".gz", "")
    #获取文件的名称，去掉
    g_file = gzip.GzipFile(file_name)
    #创建gzip对象
    open(f_name, "wb+").write(g_file.read())
    #gzip对象用read()打开后，写入open()建立的文件里。
    g_file.close() #关闭gzip对象
 
   

def un_tar(file_name):
    #untar zip file
    tar = tarfile.open(file_name)
    names = tar.getnames()
    if os.path.isdir(file_name + "_files"):
        pass
    else:
        os.mkdir(file_name + "_files")
    #由于解压后是许多文件，预先建立同名文件夹
    for name in names:
        tar.extract(name, file_name + "_files/")
    tar.close()