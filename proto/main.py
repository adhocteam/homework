from struct import *
import traceback

if __name__ == "__main__":
   USER_ID = 2456938384156277127
   DATA_FILE = "txnlog.dat"

   try:
      with open(DATA_FILE, "rb") as binary_file:
         # read header
         header_type = binary_file.read(4)
         header_version = unpack('!B', binary_file.read(1))[0]
         header_recs_cnt = unpack('!I', binary_file.read(4))[0]
         
         records = []
         # for each record - parse the next alotted bytes
         for x in range(header_recs_cnt):
            rec_type = unpack('!B', binary_file.read(1))[0]
            rec_tstamp = unpack('!I', binary_file.read(4))[0]
            rec_uid = unpack('!Q', binary_file.read(8))[0]
            record = [rec_type, rec_tstamp, rec_uid]

            # if record is a debit or credit, append amount to record
            if record[0] == 0 or record[0] == 1:
               rec_amt = unpack('!d', binary_file.read(8))[0]
               record.append(rec_amt)
            records.append(record)

      debits = sum([x[3] for x in records if x[0] == 0])
      print "What is the total amount in dollars of debits? $%s" % debits
      
      credits = sum([x[3] for x in records if x[0] == 1])
      print "What is the total amount in dollars of credits? $%s" % credits
      
      autopay_starts = len([x for x in records if x[0] == 2])
      print "How many autopays were started? %s" % autopay_starts
      
      autopay_ends = len([x for x in records if x[0] == 3])
      print "How many autopays were ended? %s" % autopay_ends

      user_recs = [x for x in records if x[2] == USER_ID]
      user_debits = sum([x[3] for x in user_recs if x[0] == 0])
      user_credits = sum([x[3] for x in user_recs if x[0] == 1])
      user_balance = user_credits - user_debits
      print "What is balance of user ID %s? $%s" % (USER_ID, user_balance)
   
   except Exception as e:
      print "ERROR - something went wrong:\n" 
      traceback.print_exc()
