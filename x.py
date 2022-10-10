import glob
import os
import pprint

gl = glob.glob("./*.wav")
delay_count = 1
swing_count = 1
data = dict()
data2 = dict()
for filename in gl:
    if 'delay' in filename:
        new_filename = f'delay{delay_count}.wav'
        new_filename_with_ext = f'.\\\\delay{delay_count}.wav'
        os.rename(filename, new_filename)
        data[filename] = new_filename
        data2[delay_count + swing_count - 1] = new_filename
        delay_count += 1
        
    else:
        new_filename = f'swing{swing_count}.wav'
        new_filename_with_ext = f'.\\\\swing{swing_count}.wav'
        os.rename(filename, new_filename_with_ext)
        data[filename] = new_filename_with_ext
        data2[delay_count + swing_count - 1] = new_filename
        swing_count += 1

with open('xxx2.txt', 'w') as f:
    f.write(pprint.pformat(data))

with open('mappings.txt', 'w') as f:
    f.write(pprint.pformat(data2))
