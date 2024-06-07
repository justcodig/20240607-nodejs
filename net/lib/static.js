const fs = require('fs')
const path = require('path');
const { loadEnvFile } = require('process');


// public 폴더의 파일들의 루트 경로를 지정
// public 폴더의 경로가 루트 경로

const rootName = "public";
// c/~/public
const rootDir = path.join(__dirname, "..", rootName);

// 폴더 안의 내용을 찾는 함수
// c/~/public/css/style.css
// c/~/public/js/index.js

const result = {};
const find = (currentPath = rootDir) => {
    // 경로의 파일과 디렉터리 목록을 읽어오자
    // readdirSync : 동기적으로 파일과 디렉터리 목록을 가져오는 메서드
    // console.log(currentPath)
    const directory = fs.readdirSync(currentPath)
    //[0 : home, 1 : mypage, 2 : style.css ]

    // directory 배열의 객수만큼
    // index => 0,1
    for (const index in directory) {
       console.log(index);
       // 폴더들의 경로를 완성
       // c/~/public/css
       // 경로가 있어야 폴더나 파일을 가져올수 있다
       // currentPath : 찾을 루트 경로와 찾을 폴더
       // 파일의 경로를 만들고 싶어
    //    __dirname + ".." + `/${directory[index]}`
       // c/~/public../css
        // join : 문장열 반환 경로를 완성시켜서 하나의 문자열을 반환 해준다

        // 폴더
        // css// js
        // 0 : c/~/public//css
        // 1 : c/~/public//js
       const findPath = path.join(currentPath, directory[index]);
    //    console.log(findPath);
    // 만약 폴더인지 파일인지
    
    const isFile = fs.statSync(findPath).isFile(); // 파일이면 true, 디렉터리 :false

    if(!isFile){
        // 폴더 안의 폴더
        // 재귀적으로 탐색
        find(findPath);
        // 코드 중단
    }else{
        // 파일인 경우
        // 탐색하는 경로가 public 디렉터리인지 확인
        const key = currentPath === rootDir ? "/": currentPath.replaceAll(rootDir, "");
        // key 객체화 시킬거라서 key 값을 뽑는것
        // js/indexjs
        // css/style.css
        // http 경로 생성
        // \\문자열이 역슬래시 \\ 로 들어오는데 css\\style.css => css/style.css
        // '\\css\\home\\index.css' => '/css/home/index.css'
        const httpPath = path.join(key,directory[index]).replaceAll("\\","/");
        // replaceAt === 직접 만들어서 사용해야한다.
        // 우리가 알고리즘 많이 풀어봐야한다 => 프로그래머스 풀어야됨

        // 내가 편하게 사용할 객체를 만들기 위해서 만든 문자열 /css/home + /indev.css
        console.log(httpPath);
        result[httpPath] = directory[index];
        }
    }
    console.log(result);
    return result;
}

module.exports = find(rootDir);
