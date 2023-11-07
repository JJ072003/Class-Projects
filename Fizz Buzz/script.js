
for (let index = 0; index < 200; index++) {
    let fizzBuzz = ''

    switch(0)
    {
        case index % 3:
            fizzBuzz += 'Fiz';
            if (index % 5 != 0){break}

        case index % 5:
            fizzBuzz += 'Buzz'
            break;

        default:
            fizzBuzz = index
    }

    console.log(fizzBuzz)
}
