import sys

''' TIME VALIDATION FUNCTIONS '''

# checks that the times given for itin items don't overlap
def validate_nooverlap(itin, user_start_time):
    typevalid = validate_types(itin)
    if not typevalid:
        return False

    if not typevalid:
        return False
    if itin[0][2] < user_start_time:
        return False
    i = 0
    while i < (len(itin) - 1):
        # check if end time of event a is after start time of event a+1
        # for itin of format [(ev1,venue1,starttime, endtime), (ev2,venue2,starttime endtime) ... ]
        if itin[i][3] > itin[i+1][2]:
            return False
        i+=1
    return True


# checks that itin items are in chronological order
def validate_chrono(itin):
    typevalid = validate_types(itin)
    if not typevalid:
        return False

    i = 0
    while i < (len(itin) - 1):
        if itin[i][2] >= itin[i+1][2]:
            return False
        i+=1
    return True

# checks that times given for itin items are within event's open hours
def validate_isopen(itin, day):
    starthours = str(day) + '_start'
    endhours = str(day) + '_end'
    i = 0
    while i < len(itin):
        typevalid = validate_types(itin)
        if not typevalid:
            return False
        event = itin[i][0]
        #print(type(itin),"itin type")
        #print(type(itin[0]),"first group thing in itin")
        #print(type(itin[0][0]),"first item of first group, aka event")
        if "start" in event:
            starthours = 'start'
            endhours = 'end'
        if itin[i][2] < event[starthours]:
            return False
        if itin[i][3] > event[endhours]:
            return False
        i+=1
    return True

# the functionality here has been absorbed into the check_overlap function
# checks that itin items fall within specified user times
#def validate_within_usertime(itin, user_times=0):
#    return False


''' DISTANCE VALIDATION FUNCTIONS '''

# check that each venue in the itinerary is within dist (in miles; optionally
# specified by the user) from the user's starting location
def validate_max_distance(itin, start_location, dist=10):

    typevalid = validate_types(itin)
    if not typevalid:
        return False

    return False

# check that each venue is within a reasonable distance of venues before
# and after it
# (dist is the same parameter as in the above function)
# this function ensures that venues in the itinerary are clustered to some
# extent, not just randomly spread out throughout the space defined by dist
def validate_event_distance(itin, dist=10):

    typevalid = validate_types(itin)
    if not typevalid:
        return False

    return False

# check that the time between each pair of adjacent events in the itinerary
# is sufficient for travel between their venues, given user's transportation mode
def validate_travel_time(itin, transport="drive"):

    typevalid = validate_types(itin)
    if not typevalid:
        return False

    return False


''' EVENT VALIDATION FUNCTIONS '''

def validate_no_duplicates(itinerary):

    typevalid = validate_types(itinerary)
    if not typevalid:
        return False

    '''
    check that there are no duplicates in the itinerary

    inputs:
        itinerary (list of dicts)

    outputs:
        0 for success
        1 for failure
    '''
    ids = set()
    for event in itinerary:
        if event[0]['event_id'] in ids:
            return 1
        ids.add(event[0]['event_id'])

    return 0

def validate_venue_id_match(itinerary):

    typevalid = validate_types(itinerary)
    if not typevalid:
        return False

    '''
    check that the events and the venues have the same venue id

    inputs:
        itinerary (list of dicts)

    outputs:
        0 for success
        1 for failure
    '''
    for event in itinerary:
        if event[0]['venue_id'] != event[1]['venue_id']:
            return 1

    return 0


def validate_event_date(itinerary, date):

    typevalid = validate_types(itinerary)
    if not typevalid:
        return False

    '''
    check that the events in the itinerary are valid for the date that the
    user input/generated

    inputs:
        itinerary (list of dicts)
        date (str) - 'mm-dd-yyyy' (could potentially change date format later)

    outputs:
        0 for success
        1 for failure
    '''
    for event in itinerary:
        # only need to check date for one time events
        # permanent events checked by time
        if 'date' in event[0]:
            if date != event[0]['date']:
                return 1

    return 0


''' OVERALL VALIDATION FUNCTIONS '''

def validate_free(itin):
    typevalid = validate_types(itin)
    if not typevalid:
        return False

    for item in itin:
        if item[0]["price"] != -10:
            return False
    return True

def validate_types(itin):
    for item in itin:
        ev = item[0]
        ven = item[1]
        st = item[2]
        et = item[3]
        if not (isinstance(ev,dict)):
            return False
        if not (isinstance(ven,dict)):
            return False
        if not (isinstance(st,int)):
            return False
        if not (isinstance(et,int)):
            return False
    return True

# wrapper for all of the above validation functions
# also checks that every element in the itinerary is the right type
def validate_itin(itin,day,start_location,free,date,user_times=0,dist=0,transport=0):
    isvalid =  (validate_nooverlap(itin,user_times) and
                    validate_chrono(itin) and
                    validate_isopen(itin,day) and
                    validate_max_distance(itin,start_location,dist) and
                    validate_event_distance(itin,dist) and
                    validate_travel_time(itin,transport) and
                    validate_no_duplicates(itin) and
                    validate_venue_id_match(itin) and
                    validate_event_date(itin,date))
    isfree = validate_free(itin)
    istypes = validate_types(itin)
    if free == 1:
        return isvalid and isfree and istypes
    else:
        return isvalid and istypes