
let globalWeapons = {}

let globalArmor = {}

function Start()
{
    globalWeapons = 
    {
        shortSword: new Weapon('Short Sword', new EquiptableStats(0, 10, 15, ["Slashing", "Piercing"], ["Cleeve", "Drill Strike"], "Simple"))
    }

    globalArmor = 
    {
        shortSword: new Armor('Chain Mail', new EquiptableStats(10, 0, 0, [null], ["Defend"], "Medium"))
    }

    const player = new Player(new WarriorClass())
    
    console.log(player)
}




class Stats
{
    constructor(strength, defence, agility, intelligence, mana, vitality)
    {
        this.strength = strength
        this.defence = defence
        this.agility = agility
        this.intelligence = intelligence
        this.mana = mana
        this.vitality = vitality
    }
}


//=========================================================================

//              ENTITIES

//=========================================================================





class DefaultEntity
{
    constructor(equiped, stats)
    {
        this.setEquiped(equiped)
        this.stats = stats
        this.freeHands
    }


    attack(enemy)
    {
        enemy.onHit(this.getDamage())
    }

    setEquiped(equiping)
    {

    }

    getDamage()
    {

    }

    onHit(damage)
    {

    }
}


class Player extends DefaultEntity
{
    constructor(myClass)
    {
        super(myClass.startingGear, myClass.defaultStats)
        this.myClass = myClass
        this.bag = myClass.startingBag
    }

    equiptItem()
    {

    }

    static onDeath()
    {

    }
}


class DefaultEnemy extends DefaultEntity
{

}


// -----------------------
// Entity RPG Classes
// -----------------------


class EntityClass
{
    constructor(stats, skills, weaponTypes, startingGear, startingBag)
    {
        this.defaultStats = stats
        this.skills = skills
        this.weaponTypes = weaponTypes
        this.startingGear = startingGear
        this.startingBag = startingBag
    }
}


class WarriorClass extends EntityClass
{
    constructor()
    {
        super(new Stats(20, 12, 10, 8, 5, 13), null, ["Simple"], [globalWeapons.shortSword, new Armor()], new Bag())
    }
}





//=========================================================================

//              EQUIPTABLES

//=========================================================================



//------------------------------------
//      EQUPTABLES STATS
//------------------------------------


class EquiptableStats
{
    constructor(armor, minAttack, maxAttack, damageType, skills, weaponType)
    {

    }
}

class ToolStats
{

}


//----------------------------------
//      EQUIPTABLE ITEMS
//----------------------------------


class Equiptable
{
    constructor(name)
    {
        this.name = name
        this.equipStats = new EquiptableStats()
    }
}


class Weapon extends Equiptable
{
    constructor(name, equipStats)
    {
        super(name)
        this.equipStats = equipStats
    }
}


class Armor extends Equiptable
{
    constructor(name, equipStats)
    {
        super(name)
        this.equipStats = equipStats
    }
}


class Tool extends Equiptable
{

}


class Bag
{
    constructor()
    {
        this.contents = []
    }

    addToBag(items)
    {
        for (const item of items) 
        {
            this.contents.push(item)
        }
    }

    removeFromBag()
    {

    }

    findInBag()
    {

    }
}


Start()