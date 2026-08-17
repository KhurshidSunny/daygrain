export interface SampleFile {
  id: string
  name: string
  filename: string
  blurb: string
  csv: string
}

export const SAMPLE_FILES: SampleFile[] = [
  {
    id: 'sensors',
    name: 'Lab sensor log',
    filename: 'lab_sensor_log.csv',
    blurb: 'Missing readings, outliers, and a column that never changes.',
    csv: `reading_id,device,temp_c,humidity,status,lab
R-01,alpha,21.4,46,ok,north
R-02,alpha,21.6,47,ok,north
R-03,beta,22.1,44,ok,north
R-04,beta,22.0,45,ok,north
R-05,gamma,21.8,48,ok,north
R-06,gamma,,49,warn,north
R-07,alpha,21.5,46,ok,north
R-08,beta,22.4,43,ok,north
R-09,gamma,21.9,50,ok,north
R-10,alpha,88.0,46,fail,north
R-11,beta,22.2,44,ok,north
R-12,gamma,21.7,51,ok,north
R-13,alpha,21.3,47,ok,north
R-14,beta,,42,warn,north
R-15,gamma,22.0,48,ok,north
R-16,alpha,21.8,46,ok,north
R-17,beta,22.3,45,ok,north
R-18,gamma,21.6,52,ok,north
R-19,alpha,21.4,46,ok,north
R-20,beta,22.1,44,ok,north
R-21,gamma,3.2,48,fail,north
R-22,alpha,21.7,47,ok,north
R-23,beta,22.0,43,ok,north
R-24,gamma,21.9,49,ok,north
R-25,alpha,21.5,46,ok,north
R-26,beta,22.2,45,ok,north
R-27,gamma,21.8,,warn,north
R-28,alpha,21.6,47,ok,north
R-29,beta,22.4,44,ok,north
R-30,gamma,21.7,50,ok,north
`,
  },
  {
    id: 'support',
    name: 'Support tickets',
    filename: 'support_tickets.csv',
    blurb: 'Empty rows, a duplicate ticket, and missing wait times.',
    csv: `ticket_id,channel,priority,wait_min,resolved,country
T-2201,email,high,14,yes,DE
T-2202,chat,low,3,yes,FR
T-2203,email,medium,41,no,ES
T-2204,chat,low,2,yes,IT
T-2205,form,high,67,no,NL
T-2206,email,medium,,yes,SE
T-2207,chat,low,4,yes,FI
T-2208,form,high,55,no,PT
T-2209,email,low,9,yes,PL
T-2210,chat,medium,18,yes,AT
T-2211,email,high,22,yes,BE
T-2212,form,low,8,yes,IE
T-2213,chat,medium,11,yes,CZ
T-2214,email,high,73,no,RO
T-2215,chat,low,5,yes,HU
T-2216,form,medium,29,yes,GR
T-2217,email,low,7,yes,DK
T-2218,chat,high,16,yes,NO
,,,,,
T-2219,form,medium,33,no,CH
T-2220,email,low,6,yes,LU
T-2221,chat,medium,12,yes,SK
T-2222,form,high,48,no,BG
T-2223,email,low,4,yes,HR
T-2224,chat,medium,19,yes,SI
T-2225,form,low,10,yes,LT
T-2203,email,medium,41,no,ES
`,
  },
]
