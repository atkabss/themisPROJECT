function Attack_M(Monster)
{
    let rd = Math.random()*0.2;
    return Math.floor(Monster.Force * (1 + rd));
}
function Attack_L(Monster)
{
    let rd = Math.random()*0.5;
    return Math.floor(Monster.Force * (1.3 + rd));
}
function Attack_XL(Monster)
{
    let rd = Math.random()*1;
    return Math.floor(Monster.Force * (2 + rd));
}
function Shield(Monster)
{
    let rd = Math.floor(Math.random()*4);
    return Monster.Level * (10 + rd);
}
function Barrier(Monster)
{
    let rd = Math.floor(Math.random()*4);
    return Monster.Level * (9 + rd);
}
function Parer(Monster)
{
    let rd = Math.random()*2;
    return Math.floor(Monster.Level * (0.2 + rd));
}
function Force_Up(Monster)
{
    let rd = Math.floor(Math.random()*Monster.Level);
    return Monster.Level * 3 + rd / 2;
}


window.Monster_FB = function(Logic, Monster)
{
    switch(Logic)
    {
        case 'Attack-M':
            resultat = Attack_M(Monster)
            type = "Attack"
            break;

        case 'Attack-L':
            resultat = Attack_L(Monster)
            type = "Attack"
            break;

        case 'Attack-XL':
            resultat = Attack_XL(Monster)
            type = "Attack"
            break;

        case 'Defense-Shield':
            resultat = Shield(Monster)
            type = "Shield"
            break;

        case 'Defense-Barrier':
            resultat = Barrier(Monster)
            type = "Barrier"
            break;

        case 'Defense-Parer':
            resultat = Parer(Monster)
            type = "Parer"
            break;

        case 'Special-1':
            resultat = Force_Up(Monster)
            type = "Force"
            break;
    }
    return {
        Resultat : resultat,
        Type : type
    }
}