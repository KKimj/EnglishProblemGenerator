// Designed by & Author Kim Jiun
// Email kkimj@hanyang.ac.kr
// Tel +82-1073313920
// Korea

var shuffleRandom = function (n)
{
    var ar = [];
    var temp = 0;
    var rnum = 0.0;
   
    //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
    for(var i=1; i<=n; i++){
        ar.push(i);
    }

    //값을 서로 섞기
    for(var i=0; i< ar.length ; i++)
    {
        rnum = Math.floor(Math.random() *n); //난수발생
        temp = ar[i];
        ar[i] = ar[rnum];
        ar[rnum] = temp;
    }

    return ar;
}



// 빈칸 read
var input_blk = function(filename) 
{
    var ans = [];
    ans[0] = []; // 기본유형
    
    var fs = require('fs');

    
    fs.readFile(filename, 'utf8', function(error, data){
        
        var idx_problem = data.indexOf('\n');

        var arr_problem =data.split(/\r?\n/);
        
        var pv_problem = 0;
        var ans_problem;
        var num_problem = 0;
    
        for(var i = 0; i< arr_problem.length; i++)
        {
            // 그냥 빈 줄 일 때 예외 처리.
            if(arr_problem[i].length<5) continue;
            num_problem++;
            ans[0].push(makeproblem_blk0(arr_problem[i], filename, num_problem));    
        }
    
        for(var i = 0; i< num_problem; i++)
        {
            try {
                var x = i+1;
                fs.appendFileSync('result'+filename, x+'. '+ans[0][i]+'\n', 'utf8');
               
              } catch (err) {
                /* Handle the error */
              }
            
        }

    })
   
}


var makeproblem_blk0 = function(proString, filename, num_problem)
{
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;
    var ans = [];
    var tmp = [];

    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;

        ans.push(string.substring(idx_start+1, idx_end));
        const string_ = string.substring(0, idx_start) + '_'.repeat(idx_end-idx_start)+ string.substring(idx_end+1, string.length);
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }


   var sengi = shuffleRandom(problem_nums);

   var sengi_str = ''; 
   var ans_str = '';

   for(var i = 1; i<=problem_nums; i++)
   {
       sengi_str+=i+") "+ans[sengi[i-1]-1]+'\n';
      
       tmp[sengi[i-1]] = i;
      //ans_str += sengi[i-1]+')';
       
   }

   for(var i = 1; i<=problem_nums; i++)
   {
      ans_str += tmp[i]+')';
      if(i<problem_nums) ans_str+=' - ';
   }
   try {
    fs.appendFileSync('result'+filename, num_problem+'번 문제. 빈칸에 알맞은 답을 골라 순서에 맞게 번호를 적으시오.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
  
  try {
    fs.appendFileSync('result'+filename, sengi_str+'\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
    return ans_str;
}


// 어법 read
var input_grm = function(filename) 
{
    var ans = [];
    ans[0] = []; // 기본유형
    ans[1] = []; // 유형 1 틀린 것만 고쳐 쓰시오
    ans[2] = []; // 유형 2 다음 글의 밑줄 친 부분 중, 어법 혹은 문맥 상 틀린 것은 모두 몇 개인가? 
    ans[3] = []; // 유형 3 다음 글을 읽고, 어법상 혹은 문맥상 어색한 6곳 을 고르시오.
    ans[4] = []; // 유형 4 다음 밑줄 친 부분 가운데, 어법 혹은 문맥상 낱말의 쓰임이 적절하지않은 것은?
    ans[5] = []; // 유형 5 다음 글의 밑줄 친 부분 가운데 틀린 곳을 모두 고르시오.
    ans[6] = []; // 유형 6 다음 글의 밑줄 친 가운데, 어법 혹은 문맥 상 틀린 것끼리 짝지어진 것을 고르시오. 
    ans[7] = []; // 유형 7 밑줄 친 중에서 문맥상 혹은 어법상 어색한 것을 찾아 올바르게 고쳐 쓰시오. (n개)

    var fs = require('fs');

    //var writer = fs.createWriteStream('result'+filename);
    fs.readFile(filename, 'utf8', function(error, data){
        
        var idx_problem = data.indexOf('\n');

        var arr_problem =data.split(/\r?\n/);
        
        var pv_problem = 0;
        var ans_problem;
        var num_problem = 0;
    
        for(var i = 0; i< arr_problem.length; i++)
        {
            // 그냥 빈 줄 일 때 예외 처리.
            if(arr_problem[i].length<5) continue;
            num_problem++;
            ans[0].push(makeproblem_grm0(arr_problem[i], filename, num_problem));    
            ans[1].push(makeproblem_grm1(arr_problem[i], filename, num_problem));
            ans[2].push(makeproblem_grm2(arr_problem[i], filename, num_problem));
            ans[3].push(makeproblem_grm3(arr_problem[i], filename, num_problem));
            ans[4].push(makeproblem_grm4(arr_problem[i], filename, num_problem));
            ans[5].push(makeproblem_grm5(arr_problem[i], filename, num_problem));
            ans[6].push(makeproblem_grm6(arr_problem[i], filename, num_problem));
            ans[7].push(makeproblem_grm7(arr_problem[i], filename, num_problem));
            
        }
    
        for(var i = 0; i< num_problem; i++)
        {
            try {
                var x = i+1;
                fs.appendFileSync('result0'+filename, x+'. '+ans[0][i]+'\n', 'utf8');
                fs.appendFileSync('result1'+filename, x+'. '+ans[1][i]+'\n', 'utf8');
                fs.appendFileSync('result2'+filename, x+'. '+ans[2][i]+'\n', 'utf8');
                fs.appendFileSync('result3'+filename, x+'. '+ans[3][i]+'\n', 'utf8');
                fs.appendFileSync('result4'+filename, x+'. '+ans[4][i]+'\n', 'utf8');
                fs.appendFileSync('result5'+filename, x+'. '+ans[5][i]+'\n', 'utf8');
                fs.appendFileSync('result6'+filename, x+'번) '+ans[6][i]+'\n', 'utf8');
                fs.appendFileSync('result7'+filename, x+'. '+ans[7][i]+'\n', 'utf8');
                
              } catch (err) {
                /* Handle the error */
              }
            
        }

    })
}


var makeproblem_grm0 = function(proString, filename, num_problem)
{
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;
    var ans = [];
    

    var ans_str = '';


    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');
        ans.push(str_tmp);

        ans_str += str_tmp[0]+', ';

        var string_ = string.substring(0, idx_start) + problem_nums+ ') '+'( ';
        
        
        //string_ += string.substring(idx_start+1, idx_end);

        var sengi = shuffleRandom(str_tmp.length);


        for(var i = 0;i<str_tmp.length; i++)
        {
            string_+=str_tmp[sengi[i]-1];
            if(i<str_tmp.length-1)
            {
                string_+=' / ';
            }
        }

        string_ +=' )'+string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result0'+filename, num_problem+'번 문제. 알맞은 답을 고르시오.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
 
   return ans_str;
}

var makeproblem_grm1 = function(proString, filename, num_problem)
{
  //틀린 것만 고쳐 쓰시오
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '\n';


    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length);

        ans_str+= problem_nums+') ';
        if(sengi[0] == 1 ) // 문제에 정답을 넣는 경우
        {

        }
        else
        {
          
          ans_str+=str_tmp[0];

        }
        ans_str += '\n';

        var string_ = string.substring(0, idx_start) + problem_nums+ ') '+'( ';
  

        
        string_+=str_tmp[sengi[0]-1];
            

        string_ +=' )'+string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result1'+filename, num_problem+'번 문제. 틀린 것만 고쳐 쓰시오.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
 
   return ans_str;
}

var makeproblem_grm2 = function(proString, filename, num_problem)
{
  // 다음 글의 밑줄 친 부분 중, 어법 혹은 문맥 상 틀린 것은 모두 몇 개인가? 
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '';
    var ans = 0;


    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length);

        if(sengi[0] == 1 ) // 문제에 정답을 넣는 경우
        {

        }
        else
        {
          ans++;

        }

        var string_ = string.substring(0, idx_start) + problem_nums+ ') (';
  

        
        string_+=str_tmp[sengi[0]-1];
            

        string_ +=')'+string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result2'+filename, num_problem+'번 문제. 다음 글의 밑줄 친 부분 중, 어법 혹은 문맥 상 틀린 것은 모두 몇 개인가?\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
  
  ans_str += ans+'개\n';
   return ans_str;
}

var makeproblem_grm3 = function(proString, filename, num_problem)
{
  // 다음 글을 읽고, 어법상 혹은 문맥상 어색한 6곳 을 고르시오.
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '';
    var ans = 0;


    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length);

        if(sengi[0] == 1 ) // 문제에 정답을 넣는 경우
        {

        }
        else
        {
          
          ans++;

        }

        var string_ = string.substring(0, idx_start) + ' ';
  

        
        string_+=str_tmp[sengi[0]-1];
            

        string_ +=string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result3'+filename, num_problem+'번 문제. 다음 글을 읽고, 어법상 혹은 문맥상 어색한 ('+ans+')곳 을 고르시오.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
  
  ans_str += ans+'개\n';
   return ans_str;
}

var makeproblem_grm4 = function(proString, filename, num_problem)
{
  // 다음 밑줄 친 부분 가운데, 어법 혹은 문맥상 낱말의 쓰임이 적절하지않은 것은? 
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var string_t = string.split('[');
    var sengi = shuffleRandom(string_t.length);
    // sengi[0] 이 정답.

    var problem_nums = 0;
    var ans_str = '\t'+sengi[0]+') ';
    
    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');


        var string_ = string.substring(0, idx_start) + ' ';
  

        
        if(problem_nums != sengi[0]) {
          string_+= problem_nums+') ( '+str_tmp[0]+' )';
        }
        else  {
          string_+= problem_nums+') ( '+str_tmp[1]+' )';
          ans_str += str_tmp[0];
        }
        string_ +=string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result4'+filename, num_problem+'번 문제. 다음 밑줄 친 부분 가운데, 어법 혹은 문맥상 낱말의 쓰임이 적절하지않은 것은?.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
  
   return ans_str;
}

var makeproblem_grm5 = function(proString, filename, num_problem)
{
  // 다음 글의 밑줄 친 부분 가운데 틀린 곳을 모두 고르시오.
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '\n';
  

    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length);

        //ans_str+= problem_nums+') ';
        if(sengi[0] == 1 ) // 문제에 정답을 넣는 경우
        {

        }
        else
        {
          
          ans_str+=problem_nums+') '+str_tmp[0];
          ans_str += '\n';
        }
        

        var string_ = string.substring(0, idx_start) + problem_nums+ ') '+'( ';
  

        
        string_+=str_tmp[sengi[0]-1];
            

        string_ +=' )'+string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

   try {
    fs.appendFileSync('result5'+filename, num_problem+'번 문제.  다음 글의 밑줄 친 부분 가운데 틀린 곳을 모두 고르시오.\n'+string+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
 
   return ans_str;
}

var makeproblem_grm6 = function(proString, filename, num_problem)
{
  // 유형 6 다음 글의 밑줄 친 가운데, 어법 혹은 문맥 상 틀린 것끼리 짝지어진 것을 고르시오. 
    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '';
    
    var ans_sengi = shuffleRandom(string.split('[').length-1);
    var ans1 = ans_sengi[0];
    var ans2 = ans_sengi[1];



    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length-1);


        var string_ = string.substring(0, idx_start) + problem_nums+ ') '+'( ';
        if(problem_nums == ans1 || problem_nums == ans2)
        {
          
          string_+=str_tmp[1];
          
        }
        else{
          
          string_+=str_tmp[0];
        }
        string_ +=' )'+string.substring(idx_end+1, string.length);
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }
    var ans_sengi = shuffleRandom(5);
    var ans = ans_sengi[0];
    string +='\n\n';
    var i;
    for(i=1;i<=5;i++)
    {
      if(ans != i)
      {
        var tmp = shuffleRandom(5);
        string +=i+'. ('+ tmp[0]+', '+tmp[1]+') ';
      }
      else
      {
        ans_str +=i+'. ('+ ans1+', '+ans2+') ';
        string +=i+'. ('+ ans1+', '+ans2+') ';
      }
      if(i == 3)
      {
        string+='\n';
      }
      else{
        string+='\t';
      }
    }
    


   try {
    fs.appendFileSync('result6'+filename, num_problem+'번 문제. 다음 글의 밑줄 친 가운데, 어법 혹은 문맥 상 틀린 것끼리 짝지어진 것을 고르시오.\n'+string+'\n\n', 'utf8');
    
  } catch (err) {
    /* Handle the error */
  }
 
   return ans_str;
}

var makeproblem_grm7 = function(proString, filename, num_problem)
{
  // 유형 7 밑줄 친 중에서 문맥상 혹은 어법상 어색한 것을 찾아 올바르게 고쳐 쓰시오. (n개)

    var fs = require('fs');
    
    var string = proString;
    var idx_start = string.indexOf('[');
    var idx_end = string.indexOf(']');

    var problem_nums = 0;


    var ans_str = '\n';
    var ans = 0;

    while(idx_start != -1 && idx_end != -1)
    {     
        problem_nums++;
        var str_tmp = string.substring(idx_start+1, idx_end).split('/');

        var sengi = shuffleRandom(str_tmp.length);

        //ans_str+= problem_nums+') ';
        if(sengi[0] == 1 ) // 문제에 정답을 넣는 경우
        {

        }
        else
        {
           
          ans_str+=problem_nums+') '+str_tmp[sengi[0]-1];
          ans_str+=' -> '+str_tmp[0];
          
          ans_str += '\n';
          ans++;
        }
        

        var string_ = string.substring(0, idx_start) + problem_nums+ ') '+'( ';
  

        
        string_+=str_tmp[sengi[0]-1];
            

        string_ +=' )'+string.substring(idx_end+1, string.length);
        
        
        
        string = string_;

        idx_start = string.indexOf('[', idx_start+1);
        idx_end = string.indexOf(']', idx_end+1);
    }

    // 
    var i;
    string +='\n\n 기호\t\t어색한 표현\t\t\t올바른 표현\n';
    for(i=0;i<ans;i++)
    {
      string += '(     )  ______________________   -> ______________________\n';
    }

   try {
    fs.appendFileSync('result7'+filename, num_problem+'번 문제.  밑줄 친 중에서 문맥상 혹은 어법상 어색한 것을 찾아 올바르게 고쳐 쓰시오. ('+ans+'개)\n'+string+'\n\n', 'utf8');
    
  } catch (err) {
    /* Handle the error */
  }
 
   return ans_str;
}

// 순서 read
var input_num = function(filename) 
{
    var ans = [];
    var fs = require('fs');

    var writer = fs.createWriteStream('result'+filename);
    fs.readFile(filename, 'utf8', function(error, data){
        
        var idx_problem = data.indexOf('\n');

        var arr_problem =data.split(/\r?\n/);
        
        var pv_problem = 0;
        var ans_problem;
        var num_problem = 0;
    
        for(var i = 0; i< arr_problem.length; i++)
        {
            // 그냥 빈 줄 일 때 예외 처리.
            if(arr_problem[i].length<5) continue;
            num_problem++;
            ans.push(makeproblem_num(arr_problem[i], filename, num_problem));    
        }
    
        for(var i = 0; i< num_problem; i++)
        {
            try {
                var x = i+1;
                fs.appendFileSync('./result'+filename, x+'. '+ans[i]+'\n', 'utf8');
                
              } catch (err) {
                /* Handle the error */
              }
            
        }

    })
}

var makeproblem_num = function(proString, filename, num_problem)
{
    var fs = require('fs');
    
    var string = proString.split('\\');

    var problem_nums = 0;
    var ans = [];
    

    var sengi_str = '';
    var ans_str = '';
    var problem = [];

    var sengi = shuffleRandom(string.length-1);
    var sengiselect = shuffleRandom(5);

    problem.push(shuffleRandom(string.length-1));
    problem.push(shuffleRandom(string.length-1));
    problem.push(shuffleRandom(string.length-1));
    problem.push(shuffleRandom(string.length-1));
    problem.push(shuffleRandom(string.length-1));
    

    var string_ = string[0] + '\n\n';
    //var tmp = problem[0];
    var tmp = [];
    for(var i = 0;i<string.length-1;i++)
    {
        var x = i+1
        string_ += '('+x+') '+string[problem[0][i]]+'\n';
        tmp[problem[0][i]-1] = x;
    }
    problem[0] = tmp;

    for(var i=0;i<5;i++)
    {
        var x = i+1;
        sengi_str += x+'. ';
        sengi_str += problem[[sengiselect[i]-1]];
        sengi_str += '\n';
        if(sengiselect[i]==1)
        {
            ans_str +='번 답 : '+x+'.\n';
        }
    }

    

   try {
    fs.appendFileSync('result'+filename, num_problem+'번 문제. 다음 주어진 글에 이어질 순서로 바르게 짝지어진 것을 고르시오.\n'+string_+'\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }

  try {
    fs.appendFileSync('result'+filename, sengi_str+'\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }
   return ans_str;
  
}



// 삽입 read
var input_ins = function(filename) 
{
    var ans = [];
    var fs = require('fs');

    var writer = fs.createWriteStream('result'+filename);
    fs.readFile(filename, 'utf8', function(error, data){
        
        var idx_problem = data.indexOf('\n');

        var arr_problem =data.split(/\r?\n/);
        
        var pv_problem = 0;
        var ans_problem;
        var num_problem = 0;
    
        for(var i = 0; i< arr_problem.length; i++)
        {
            // 그냥 빈 줄 일 때 예외 처리.
            if(arr_problem[i].length<5) continue;
            num_problem++;
            ans.push(makeproblem_ins(arr_problem[i], filename, num_problem));    
        }
    
        for(var i = 0; i< num_problem; i++)
        {
            try {
                var x = i+1;
                fs.appendFileSync('result'+filename, x+'. '+ans[i]+'\n', 'utf8');
              } catch (err) {
                /* Handle the error */
              }
            
        }

    })
}

var makeproblem_ins = function(proString, filename, num_problem)
{
    var fs = require('fs');
    
    var string = proString.split('\\');

    var problem_nums = 0;
    var ans = [];
    

    var sengi_str = '';
    var ans_str = '';
    var problem = [];
    var first_str = '';
    var string_ = '';
    var ins_num = 1;
    for(var i = 0 ;i<string.length;i++)
    {
        
        var x = i+1;
        if(string[i].substring(0,1) == '주')
        {
            ans_str +=x+')';
            //string_ += ' ('+ins_num+') ';
            first_str += string[i].substring(1, string[i].length);
            continue;
        }
        string_ +=' ('+ins_num+') '+ string[i];
        ins_num++;
    }

    
    

   try {
    fs.appendFileSync('result'+filename, num_problem+'번 문제. 다음 글의 흐름으로 보아, 주어진 문장이 들어가기에 가장 적절한 곳은?\n'+ first_str+'\n\n'+string_+'\n\n', 'utf8');
  } catch (err) {
    /* Handle the error */
  }

  
   return ans_str;
    
}

input_ins('삽입.txt');
input_blk('빈칸.txt');
input_grm('어법.txt');
input_num('순서.txt');


// 중 옳은 것을 고르시오

// 다음 글의 밑줄 친 부분 중, 어법 혹은 문맥 상 틀린 것은 모두 몇 개인가? 

//  다음 글을 읽고, 어법상 혹은 문맥상 어색한 6곳 을 고르시오.
//  다음 밑줄 친 부분 가운데, 어법 혹은 문맥상 낱말의 쓰임이 적절하지않은 것은?
//  다음 글의 밑줄 친 부분 가운데 틀린 곳을 모두 고르시오. 

// 중에서 문맥상 혹은 어법상 어색한 것을 찾아 올바르게 고쳐 쓰시오.
