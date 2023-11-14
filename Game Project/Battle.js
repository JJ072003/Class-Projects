
let globalWeapons = {}

let globalArmor = {}

let selectionCords = 1
let selectorSkope = 4
let selectionTarget = '#option'

const enemyContEl = document.querySelector("#enemy-container")

const actionBarEl = document.querySelector("#action-bar")

const player = []
const enemies = []

function Start()
{
    globalWeapons = 
    {
        shortSword: new Weapon('Short Sword', new EquiptableStats(0, 10, 15, ["Slashing", "Piercing"], ["Cleeve", "Drill Strike"]), "Simple"),
    }

    globalArmor = 
    {
        chainMail: new Armor('Chain Mail', new EquiptableStats(10, 0, 0, [null], ["Defend"]), "Medium", 'body')
    }

    window.addEventListener("keydown", onKeyPress)

    player.push(new Player(new WarriorClass()))
    enemies.push(new DefaultEnemy(new Slime()), new DefaultEnemy(new Slime()), new DefaultEnemy(new Slime()), new DefaultEnemy(new Slime()))
    initalizeEnemies()
}


function initalizeEnemies()
{
    for (let i = 1; i <= enemies.length; i++) 
    {
        let enemyEl = document.createElement('div')
        enemyEl.className = "all-enemies"
        enemyEl.id = 'enemy' + i
        enemyContEl.appendChild(enemyEl)
    }
}


function removeEnemy(enemyID)
{
    document.querySelector('#enemy' + (enemyID + 1)).remove()
    selectorSkope--
    for (let i = enemyID + 2; i <= enemies.length + 1; i++) 
    {
        console.log(i)
        document.querySelector('#enemy' + i).id = 'enemy' + (i - 1)
    }
}


function onKeyPress(event)
{
    let previousSelect = null
    switch(event.key.toUpperCase())
    {
        case "ARROWUP":
            if(selectionCords > 2)
            {
                previousSelect = selectionCords
                selectionCords -= 2
            }
            break
        
        case "ARROWDOWN":
            if(selectionCords <= 2)
            {
                previousSelect = selectionCords
                selectionCords += 2
            }
            break

        case "ARROWLEFT":
            if(selectionCords > 1)
            {
                previousSelect = selectionCords
                selectionCords--
            }
            break

        case "ARROWRIGHT":
            if(selectionCords < selectorSkope)
            {
                previousSelect = selectionCords
                selectionCords++
            }
            break

        default:
            previousSelect = null
            break
    }

    if (previousSelect != null)
    {
        let previousOption = document.querySelector(selectionTarget + previousSelect)
        previousOption.style.backgroundColor = 'gray'
    }

    let activeOption = document.querySelector(selectionTarget + selectionCords)
    activeOption.style.backgroundColor = "blue"

    if(event.key.toUpperCase() == " ")
    {
        switch(activeOption.textContent.toUpperCase())
        {
            case "ATTACK":
                selectionTarget = "#enemy"
                activeOption.style.backgroundColor = 'gray'

            default:
                break
        }

        switch(activeOption.id.toUpperCase().slice(0, -1))
        {
            case "ENEMY":
                let enemyPos = activeOption.id.charAt(activeOption.id.length - 1) - 1
                player[0].attack(enemies[enemyPos], enemyPos)
                activeOption.style.backgroundColor = 'gray'
                selectionTarget = "#option"

            default:
                break
        }
    }
}


function getRandNum(min, max)
{
    return Math.floor((Math.random() * (max - min + 1)) + min)
}


function clampNum(min, max, num)
{
    return Math.min(Math.max(num, min), max)
} 


class Stats
{
    constructor(strength, defence, dexterity, intelligence, mana, vitality)
    {
        this.strength = strength
        this.defence = defence
        this.dexterity = dexterity
        this.intelligence = intelligence
        this.mana = mana
        this.totalVitality = vitality
        this.currentVitality = vitality
    }
}


//=========================================================================

//              ENTITIES

//=========================================================================





class DefaultEntity
{
    constructor(equipted, stats)
    {
        this.equipted = {armor: {head: null, body: null, pants: null, boots: null, gloves: null}, hands: {left: null, right: null}}
        this.equiptItems(equipted)
        this.stats = stats
    }


    attack(enemy, enemyNum)
    {
        enemy.onHit(this.getDamage(), enemyNum)
    }

    equiptItems(equipting)
    {
        if(equipting != null)
        {
            for (const item of equipting) 
            {
                switch(item.equiptType.toUpperCase())
                {
                    case "SIMPLE":
                        if(this.equipted.hands.right == null)
                        {
                            this.equipted.hands.right = item
                        }
                        else if (this.equipted.hands.left == null)
                        {
                            this.equipted.hands.left = item
                        }
                        break

                    case "MEDIUM":
                        if(this.equipted.armor[item.slot] == null)
                        {
                            this.equipted.armor[item.slot] = item
                        }  
                        break

                    default:
                        break
                }
            }
        }
    }

    getDamage()
    {
        for (const item in this.equipted.hands) 
        {
            if(this.equipted.hands[item] != null)
            {
                switch(this.equipted.hands[item].equiptType.toUpperCase())
                {
                    case "SIMPLE":
                        return getRandNum(this.equipted.hands[item].equipStats.minAttack, this.equipted.hands[item].equipStats.maxAttack) + ((Math.max(this.stats.strength, this.stats.dexterity) / 100) * this.equipted.hands[item].equipStats.maxAttack)
                
                    default:
                        break
                }
            }
        }
    }

    getDefence()
    {

    }

    onHit(damage, entityNum)
    {
        if(clampNum(0, 1, ((getRandNum(0, 15) - 5) / 10) + clampNum(0, 0.9, this.stats.defence / 1000)) > 0)
        {
            this.stats.currentVitality -= damage
            console.log(this.stats.currentVitality)
        }

        if (this.stats.currentVitality <= 0)
        {
            this.onDeath(entityNum)
        }
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

    onDeath(playerNum)
    {

    }
}


class DefaultEnemy extends DefaultEntity
{
    constructor(enemyType)
    {
        super(enemyType.startingGear, enemyType.defaultStats)
        this.enemyType = enemyType
        this.bag = enemyType.startingBag
    }

    onDeath(enemyNum)
    {
        console.log(enemyNum)
        console.log("DIED")
        enemies.splice(enemyNum, 1)
        removeEnemy(enemyNum)
    }
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


class Slime extends EntityClass
{
    constructor()
    {
        super(new Stats(5, 2, 2, 1, 0, 5), ["Flurry Of Blows"], null, null, null)
    }
}


class WarriorClass extends EntityClass
{
    constructor()
    {
        super(new Stats(20, 12, 10, 8, 5, 25), null, ["Simple"], [globalWeapons.shortSword], new Bag())
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
    constructor(armor, minAttack, maxAttack, damageType, skills)
    {
        this.armor = armor
        this.minAttack = minAttack
        this.maxAttack = maxAttack
        this.damageType = damageType
        this.skills = skills
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
    constructor(name, equipStats, equiptType)
    {
        this.name = name
        this.equipStats = equipStats
        this.equiptType = equiptType
    }
}


class Weapon extends Equiptable
{
    constructor(name, equipStats, equiptType)
    {
        super(name, equipStats, equiptType)
    }
}


class Armor extends Equiptable
{
    constructor(name, equipStats, equiptType, slot)
    {
        super(name, equipStats, equiptType)
        this.slot = slot
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